import get from 'lodash/get'
import keys from 'lodash/keys'
import compose from 'compose-then'
import flamelink from '@flamelink/sdk-app'
import * as App from '@flamelink/sdk-app-types'
import { FlamelinkFactory, Api, RTDB } from '@flamelink/sdk-content-types'
import {
  applyOptionsForRTDB,
  pluckResultFields,
  populateEntry,
  FlamelinkError,
  getTimestamp,
  getCurrentUser,
  wrap,
  unwrap
} from '@flamelink/sdk-utils'
import { getContentRefPath } from './helpers'

const factory: FlamelinkFactory = context => {
  const api: Api = {
    ref(reference) {
      const dbService = flamelink._ensureService('database', context)
      return dbService.ref(
        getContentRefPath(reference, context.env, context.locale)
      )
    },

    getRaw({ schemaKey, entryId, ...options }: RTDB.Get) {
      return applyOptionsForRTDB(
        api.ref(entryId ? [schemaKey, entryId] : schemaKey),
        options
      ).once(options.event || 'value')
    },

    async get({ schemaKey, entryId, ...options }: RTDB.Get = {}) {
      const pluckFields = pluckResultFields(options.fields)
      const populateFields = populateEntry(context, schemaKey, options.populate)
      const snapshot = await api.getRaw({ ...options, schemaKey, entryId })

      if (entryId) {
        return await compose(
          unwrap(entryId),
          populateFields,
          pluckFields,
          wrap(entryId)
        )(snapshot.val())
      }

      const schema = await get(context, 'modules.schemas').get({ schemaKey })
      const isSingleType = schema && schema.type === 'single'

      // If content type is a single, we need to wrap the object for filters to work correctly
      if (schemaKey) {
        const value = isSingleType
          ? wrap(schemaKey, snapshot.val())
          : snapshot.val()

        const result = await compose(
          populateFields,
          pluckFields
        )(value)

        return isSingleType ? unwrap(schemaKey, result) : result
      }

      const withLocales = snapshot.val()

      const withoutLocales = keys(withLocales).reduce(
        (menus, key) =>
          Object.assign(menus, { [key]: withLocales[key][context.locale] }),
        {}
      )

      const result = await compose(
        populateFields,
        pluckFields
      )(withoutLocales)
      return result
    },

    getByFieldRaw({ schemaKey, field, value, ...options }: RTDB.GetByField) {
      return api.getRaw({
        schemaKey,
        ...options,
        orderByChild: field,
        equalTo: value
      })
    },

    async getByField({ schemaKey, field, value, ...options }: RTDB.GetByField) {
      return api.get({
        schemaKey,
        ...options,
        orderByChild: field,
        equalTo: value
      })
    },

    subscribeRaw({ schemaKey, entryId, callback, ...options }: RTDB.Subscribe) {
      const filteredRef = applyOptionsForRTDB(
        api.ref(entryId ? [schemaKey, entryId] : schemaKey),
        options
      )

      filteredRef.on(
        options.event || 'value',
        (snapshot: any) => callback(null, snapshot),
        (err: Error) => callback(err, null)
      )

      const unsubscribe: App.UnsubscribeMethod = () =>
        filteredRef.off(options.event || 'value')
      return unsubscribe
    },

    subscribe({ schemaKey, entryId, callback, ...options }: RTDB.Subscribe) {
      const pluckFields = pluckResultFields(options.fields)

      return api.subscribeRaw({
        schemaKey,
        entryId,
        ...options,
        async callback(err, snapshot) {
          if (err) {
            return callback(err, null)
          }

          const value = schemaKey
            ? wrap(schemaKey, snapshot.val())
            : snapshot.val()
          const result = await pluckFields(value)

          return callback(null, schemaKey ? unwrap(schemaKey, result) : result)
        }
      })
    },

    async add({ schemaKey, data }: RTDB.Add) {
      const entryId = Date.now().toString()

      const schemasAPI = get(context, 'modules.schemas', {
        getFields() {
          throw new FlamelinkError(
            'The "schemas" module is required. Please ensure it is properly imported.'
          )
        }
      })

      const schemaFields = await schemasAPI.getFields({
        schemaKey
      })

      const defaultValues = schemaFields.reduce(
        (acc: any, field: any) =>
          Object.assign(acc, {
            [field.key]: get(field, 'defaultValue', null)
          }),
        {}
      )

      const payload =
        typeof data === 'object'
          ? {
              ...defaultValues,
              ...data,
              __meta__: {
                createdBy: getCurrentUser(context),
                createdDate: getTimestamp(context)
              },
              id: entryId
            }
          : data

      await api.ref([schemaKey, entryId]).set(payload)

      return payload
    },

    async update({ schemaKey, entryId, data }: RTDB.Update) {
      if (
        typeof schemaKey !== 'string' ||
        !entryId ||
        (typeof data !== 'object' && data !== null)
      ) {
        throw new FlamelinkError(
          '"update" called with the incorrect arguments. Check the docs for details.'
        )
      }

      const payload =
        typeof data === 'object'
          ? {
              ...data,
              '__meta__/lastModifiedBy': getCurrentUser(context),
              '__meta__/lastModifiedDate': getTimestamp(context),
              id: entryId
            }
          : data

      await api.ref([schemaKey, entryId]).update(payload)

      return payload
    },

    remove({ schemaKey, entryId }: RTDB.Remove) {
      if (!schemaKey) {
        throw new FlamelinkError(
          '"remove" called with the incorrect arguments. Check the docs for details.'
        )
      }
      return api.ref(entryId ? [schemaKey, entryId] : schemaKey).remove()
    }
  }

  return api
}

export default factory
