import get from 'lodash/get'
import set from 'lodash/set'
import keys from 'lodash/keys'
import castArray from 'lodash/castArray'
import flamelink from '@flamelink/sdk-app'
import * as App from '@flamelink/sdk-app-types'
import { FlamelinkFactory, Api, RTDB } from '@flamelink/sdk-schemas-types'
import {
  applyOptionsForRTDB,
  pluckResultFields,
  hasNonCacheableOptionsForRTDB,
  logError,
  FlamelinkError,
  getTimestamp,
  getCurrentUser,
  wrap,
  unwrap
} from '@flamelink/sdk-utils'
import { getSchemasRefPath } from './helpers'

export const factory: FlamelinkFactory = context => {
  const api: Api = {
    ref(schemaKey) {
      const dbService = flamelink._ensureService('database', context)
      context.emitter.emit('schema:ref', { schemaKey })
      return dbService.ref(getSchemasRefPath(schemaKey, context.env))
    },

    getRaw({ schemaKey, ...options }: RTDB.Get) {
      return applyOptionsForRTDB(api.ref(schemaKey), options).once(
        options.event || 'value'
      )
    },

    async get({ schemaKey, ...options }: RTDB.Get = {}) {
      const pluckFields = pluckResultFields(options.fields)

      let result = get(
        context,
        `cache.schemas[${context.env}]${schemaKey ? `.${schemaKey}` : ''}`
      )

      if (!result || hasNonCacheableOptionsForRTDB(options)) {
        const snapshot = await api.getRaw({ schemaKey, ...options })
        result = snapshot.val()
      }

      if (schemaKey) {
        // Wrap result for the field plucking to work
        result = wrap(schemaKey, result)
      }

      return await pluckFields(schemaKey ? unwrap(schemaKey, result) : result)
    },

    getFieldsRaw({ schemaKey, ...options }: RTDB.Get) {
      return applyOptionsForRTDB(
        api.ref(schemaKey ? `${schemaKey}/fields` : ''),
        options
      ).once(options.event || 'value')
    },

    async getFields({ schemaKey, ...options }: RTDB.Get) {
      const pluckFields = pluckResultFields(options.fields)

      const schemaCache = get(
        context,
        `cache.schemas[${context.env}]${schemaKey ? `.${schemaKey}` : ''}`
      )

      if (schemaKey) {
        let fields = get(schemaCache, 'fields', null)

        if (!fields || hasNonCacheableOptionsForRTDB(options)) {
          const snapshot = await api.getFieldsRaw({ schemaKey, ...options })
          fields = snapshot.val()
        }

        return await pluckFields(fields)
      }

      let schemas = schemaCache

      if (!schemas || hasNonCacheableOptionsForRTDB(options)) {
        const snapshot = await api.getFieldsRaw(options)
        schemas = snapshot.val() // eslint-disable-line require-atomic-updates
      }

      return keys(schemas).reduce(
        (acc, key) =>
          Object.assign(acc, {
            [key]: pluckFields(schemas[key].fields)
          }),
        {}
      )
    },

    subscribeRaw({ schemaKey, callback, ...options }: RTDB.Subscribe) {
      const filteredRef = applyOptionsForRTDB(api.ref(schemaKey), options)

      filteredRef.on(
        options.event || 'value',
        (snapshot: any) => callback(null, snapshot),
        (err: Error) => callback(err, null)
      )

      const unsubscribe: App.UnsubscribeMethod = () =>
        filteredRef.off(options.event || 'value')
      return unsubscribe
    },

    subscribe({ schemaKey, callback, ...options }: RTDB.Subscribe) {
      const pluckFields = pluckResultFields(options.fields)

      return api.subscribeRaw({
        schemaKey,
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

    subscribeFields({
      schemaKey,
      fields,
      callback,
      ...options
    }: RTDB.Subscribe) {
      const pluckFields = pluckResultFields(fields)

      return api.subscribeRaw({
        schemaKey,
        ...options,
        async callback(err, snapshot) {
          if (err) {
            return callback(err, null)
          }

          const val = snapshot.val()

          if (schemaKey) {
            const result = await pluckFields(get(val, 'fields', null))
            return callback(null, result)
          }

          const pluckedFields = await Promise.all(
            Object.keys(val || {}).map(async sKey => {
              const sFields = await pluckFields(val[sKey].fields)
              return { sKey, sFields }
            })
          )

          const result = pluckedFields.reduce((schemaFields, pluckedField) => {
            return Object.assign(schemaFields, {
              [pluckedField.sKey]: pluckedField.sFields
            })
          }, {})

          return callback(null, result)
        }
      })
    },

    async add({ schemaKey, data }: RTDB.Add) {
      if (
        typeof schemaKey !== 'string' ||
        (typeof data !== 'object' && data !== null)
      ) {
        throw new FlamelinkError(
          '"add" called with the incorrect arguments. Check the docs for details.'
        )
      }

      const payload =
        typeof data === 'object'
          ? Object.assign({}, data, {
              __meta__: {
                createdBy: getCurrentUser(context),
                createdDate: getTimestamp(context)
              },
              description: data.description || '',
              enabled:
                typeof data.enabled === 'undefined'
                  ? true
                  : Boolean(data.enabled),
              fields: data.fields ? castArray(data.fields) : [],
              group: data.group || '',
              icon: data.icon || '',
              id: schemaKey,
              sortable:
                typeof data.sortable === 'undefined'
                  ? true
                  : Boolean(data.sortable),
              title: data.title || schemaKey,
              type: data.type || 'collection'
            })
          : data

      await api.ref(schemaKey).set(payload)

      return payload
    },

    async update({ schemaKey, data }: RTDB.Update) {
      if (
        typeof schemaKey !== 'string' ||
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
              __meta__: {
                ...(data.__meta__ || {}),
                lastModifiedBy: getCurrentUser(context),
                lastModifiedDate: getTimestamp(context)
              },
              id: schemaKey
            }
          : data

      await api.ref(schemaKey).update(payload)

      return payload
    },

    remove({ schemaKey }: RTDB.Remove) {
      if (!schemaKey) {
        throw new FlamelinkError(
          '"remove" called with the incorrect arguments. Check the docs for details.'
        )
      }
      return api.ref(schemaKey).remove()
    }
  }

  /**
   * @description If precaching is enabled, we subscribe to all or the specified
   * schemas and cache them on in the `context.cache`. Since we are subscribing
   * the cache remains up to date with the server.
   */
  const subscribeAndCacheSchemas = () => {
    if (context.precache) {
      const schemaKeys: string[] =
        context.precache === true
          ? [null]
          : get(context, 'precache.schemas', [null])

      schemaKeys.forEach(schemaKey => {
        api.subscribe({
          schemaKey,
          callback: (err, schemas) => {
            if (err) {
              return logError(err.toString())
            }
            return set(
              context,
              `cache.schemas[${context.env}]${
                schemaKey ? `.${schemaKey}` : ''
              }`,
              schemas
            )
          }
        })
      })
    }
  }

  // Only start precaching when the user starts interacting with this API
  if (typeof get(context, 'emitter.once') === 'function') {
    context.emitter.once('schema:ref', subscribeAndCacheSchemas)
  }

  return api
}

export const register: App.SetupModule = (context: App.Context) => {
  if (context.dbType === 'rtdb') {
    return factory(context)
  }

  return null
}

flamelink._registerModule('schemas', register)
