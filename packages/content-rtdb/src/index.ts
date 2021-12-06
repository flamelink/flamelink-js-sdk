import get from 'lodash/get'
import keys from 'lodash/keys'
import compose from 'compose-then'
import flamelink from '@flamelink/sdk-app'
import * as App from '@flamelink/sdk-app-types'
import { DataSnapshot } from '@firebase/database-types'
import { FlamelinkFactory, Api, RTDB } from '@flamelink/sdk-content-types'
import { SchemaFields, SchemaField, Schema } from '@flamelink/sdk-schemas-types'
import {
  applyOptionsForRTDB,
  pluckResultFields,
  populateEntry,
  logWarning,
  FlamelinkError,
  getTimestamp,
  getCurrentUser,
  wrap,
  unwrap,
} from '@flamelink/sdk-utils'
import { getContentRefPath } from './helpers'
import '@flamelink/sdk-schemas-rtdb'

export const factory: FlamelinkFactory = (context) => {
  const api: Api = {
    ref(reference, options) {
      const dbService = flamelink._ensureService('database', context)
      return dbService.ref(
        getContentRefPath(
          reference,
          get(options, 'env', get(options, 'env', context.env)),
          get(options, 'locale', get(options, 'locale', context.locale))
        )
      )
    },

    getRaw({ schemaKey, entryId, ...options }: RTDB.Get) {
      return applyOptionsForRTDB(
        api.ref(entryId ? [schemaKey, entryId] : schemaKey, options),
        options
      ).once(options.event || 'value')
    },

    async get({ schemaKey, entryId, ...options }: RTDB.Get = {}) {
      const pluckFields = pluckResultFields(options.fields)
      const populateFields = populateEntry(context, schemaKey, options.populate)
      const snapshot: DataSnapshot = await api.getRaw({
        ...options,
        schemaKey,
        entryId,
      })

      if (entryId) {
        return await compose(
          unwrap(entryId),
          populateFields,
          pluckFields,
          wrap(entryId)
        )(snapshot.val())
      }

      const schema: Schema = await get(context, 'modules.schemas').get({
        schemaKey,
      })
      const isSingleType = schema && schema.type === 'single'

      // If content type is a single, we need to wrap the object for filters to work correctly
      if (schemaKey) {
        const value = isSingleType
          ? wrap(schemaKey, snapshot.val())
          : snapshot.val()

        const result = await compose(populateFields, pluckFields)(value)

        return isSingleType ? unwrap(schemaKey, result) : result
      }

      const withLocales = snapshot.val()

      const withoutLocales = keys(withLocales).reduce(
        (menus, key) =>
          Object.assign(menus, { [key]: withLocales[key][context.locale] }),
        {}
      )

      const result = await compose(populateFields, pluckFields)(withoutLocales)
      return result
    },

    getByFieldRaw({ schemaKey, field, value, ...options }: RTDB.GetByField) {
      return api.getRaw({
        schemaKey,
        ...options,
        orderByChild: field,
        equalTo: value,
      })
    },

    async getByField({ schemaKey, field, value, ...options }: RTDB.GetByField) {
      return api.get({
        schemaKey,
        ...options,
        orderByChild: field,
        equalTo: value,
      })
    },

    subscribeRaw({ schemaKey, entryId, callback, ...options }: RTDB.Subscribe) {
      const filteredRef = applyOptionsForRTDB(
        api.ref(entryId ? [schemaKey, entryId] : schemaKey, options),
        options
      )

      filteredRef.on(
        options.event || 'value',
        (snapshot: DataSnapshot) => callback(null, snapshot),
        (err: Error) => callback(err, null)
      )

      const unsubscribe: App.UnsubscribeMethod = () =>
        filteredRef.off(options.event || 'value')
      return unsubscribe
    },

    subscribe({ schemaKey, entryId, callback, ...options }: RTDB.Subscribe) {
      const pluckFields = pluckResultFields(options.fields)
      const populateFields = populateEntry(context, schemaKey, options.populate)

      return api.subscribeRaw({
        schemaKey,
        entryId,
        ...options,
        async callback(err, snapshot: DataSnapshot) {
          try {
            if (err) {
              return callback(err, null)
            }

            if (entryId) {
              const result = await compose(
                unwrap(entryId),
                populateFields,
                pluckFields,
                wrap(entryId)
              )(snapshot.val())

              return callback(null, result)
            }

            const schema: Schema = await get(context, 'modules.schemas').get({
              schemaKey,
            })
            const isSingleType = schema && schema.type === 'single'

            // If content type is a single, we need to wrap the object for filters to work correctly
            if (schemaKey) {
              const value = isSingleType
                ? wrap(schemaKey, snapshot.val())
                : snapshot.val()

              const result = await compose(populateFields, pluckFields)(value)

              return callback(
                null,
                isSingleType ? unwrap(schemaKey, result) : result
              )
            }

            const withLocales = snapshot.val()

            const withoutLocales = keys(withLocales).reduce(
              (menus, key) =>
                Object.assign(menus, {
                  [key]: withLocales[key][context.locale],
                }),
              {}
            )

            const result = await compose(
              populateFields,
              pluckFields
            )(withoutLocales)

            return callback(null, result)
          } catch (err) {
            return callback(err, null)
          }
        },
      })
    },

    async add({
      schemaKey,
      entryId = Date.now().toString(),
      data,
      status,
      env,
      locale,
    }: RTDB.Add) {
      const schemasAPI = get(context, 'modules.schemas', {
        getFields() {
          throw new FlamelinkError(
            'The "schemas" module is required. Please ensure it is properly imported.'
          )
        },
      })

      const schemaFields: SchemaFields = await schemasAPI.getFields({
        schemaKey,
      })

      const defaultValues = schemaFields.reduce(
        (acc: Record<string, unknown>, field: SchemaField) =>
          Object.assign(acc, {
            [field.key]: get(field, 'defaultValue', null),
          }),
        {}
      )

      const databaseService = flamelink._ensureService('database', context)

      let createDefaultEntry = false
      let defaultLocale = ''

      const defaultLocaleSnapshot = await databaseService
        .ref('flamelink/settings/defaultLocale')
        .once('value')

      defaultLocale = defaultLocaleSnapshot.val()

      if (defaultLocale && defaultLocale !== (locale || context.locale)) {
        if (!entryId) {
          createDefaultEntry = true
        } else {
          const defaultEntry = await api.get({
            schemaKey,
            entryId,
            locale: defaultLocale,
          })

          if (!defaultEntry) {
            createDefaultEntry = true
          }
        }
      }

      const payload =
        typeof data === 'object'
          ? {
              ...defaultValues,
              order: 0,
              parentId: 0,
              ...data,
              __meta__: {
                createdBy: getCurrentUser(context),
                createdDate: getTimestamp(context),
                ...(status ? { status } : {}),
              },
              id: entryId,
            }
          : data

      await api
        .ref([schemaKey, entryId], {
          locale,
          env,
        })
        .set(payload)

      if (createDefaultEntry) {
        const defaultPayload = {
          __meta__: {
            ...payload.__meta__,
            createdFromLocale: locale || context.locale,
          },
          id: entryId,
          order: get(payload, 'order', 0),
          parentId: get(payload, 'parentId', 0),
        }

        await api
          .ref([schemaKey, entryId], {
            locale: defaultLocale,
            env: env || context.env,
          })
          .set(defaultPayload)
      }

      return payload
    },

    async update({
      schemaKey,
      entryId,
      data,
      status,
      env,
      locale,
    }: RTDB.Update) {
      if (
        typeof schemaKey !== 'string' ||
        !entryId ||
        (typeof data !== 'object' && data !== null)
      ) {
        throw new FlamelinkError(
          '"update" called with the incorrect arguments. Check the docs for details.'
        )
      }

      const snapshot = await api
        .ref([schemaKey, entryId], { env, locale })
        .once('value')

      if (!snapshot.val()) {
        logWarning(
          `No entry existed for schema "${schemaKey}" with ID "${entryId}" - creating new entry instead.`
        )
        return api.add({ schemaKey, entryId, data, status, env, locale })
      }

      const payload =
        typeof data === 'object'
          ? {
              ...data,
              __meta__: {
                ...(data.__meta__ || {}),
                lastModifiedBy: getCurrentUser(context),
                lastModifiedDate: getTimestamp(context),
                ...(status ? { status } : {}),
                createdFromLocale: null,
              },
              id: entryId,
            }
          : data

      await api.ref([schemaKey, entryId], { env, locale }).update(payload)

      return payload
    },

    remove({ schemaKey, entryId }: RTDB.Remove) {
      if (!schemaKey) {
        throw new FlamelinkError(
          '"remove" called with the incorrect arguments. Check the docs for details.'
        )
      }
      return api.ref(entryId ? [schemaKey, entryId] : schemaKey).remove()
    },
  }

  return api
}

export const register: App.SetupModule = (context: App.Context) => {
  if (context.dbType === 'rtdb') {
    return factory(context)
  }

  return null
}

flamelink._registerModule('content', register)
