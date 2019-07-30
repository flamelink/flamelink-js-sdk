import get from 'lodash/get'
import set from 'lodash/set'
import keys from 'lodash/keys'
import chunk from 'lodash/chunk'
import castArray from 'lodash/castArray'
import flamelink from '@flamelink/sdk-app'
import { FlamelinkFactory, Api, CF } from '@flamelink/sdk-schemas-types'
import {
  applyOptionsForCF,
  pluckResultFields,
  hasNonCacheableOptionsForCF,
  logError,
  logWarning,
  FlamelinkError,
  createQueue,
  getTimestamp,
  getCurrentUser,
  wrap,
  unwrap
} from '@flamelink/sdk-utils'
import { CF_BATCH_WRITE_LIMIT } from '../constants'

const SCHEMAS_COLLECTION = 'fl_schemas'

const factory: FlamelinkFactory = context => {
  const api: Api = {
    ref(schemaKey) {
      const firestoreService = flamelink._ensureService('firestore', context)
      context.emitter.emit('schema:ref', { schemaKey })

      const baseRef = firestoreService
        .collection(SCHEMAS_COLLECTION)
        .where('_fl_meta_.env', '==', context.env)

      return schemaKey
        ? baseRef.where('_fl_meta_.fl_id', '==', schemaKey)
        : baseRef
    },

    getRaw({ schemaKey, ...options }: CF.Get) {
      return applyOptionsForCF(api.ref(schemaKey), options).get({
        source: options.source || 'default'
      })
    },

    async get({ schemaKey, ...options }: CF.Get = {}) {
      const pluckFields = pluckResultFields(options.fields)

      let schemas = get(
        context,
        `cache.schemas[${context.env}]${schemaKey ? `.${schemaKey}` : ''}`,
        {}
      )

      if (!keys(schemas).length || hasNonCacheableOptionsForCF(options)) {
        const snapshot = await api.getRaw({ schemaKey, ...options })

        if (snapshot.empty) {
          return null
        }

        schemas = {} // eslint-disable-line require-atomic-updates

        snapshot.forEach((doc: any) => {
          const data = doc.data()
          schemas[get(data, '_fl_meta_.fl_id', doc.id)] = data
        })

        if (schemaKey) {
          schemas = unwrap(schemaKey, schemas) // eslint-disable-line require-atomic-updates
        }
      }

      if (schemaKey) {
        // Wrap result for the field plucking to work
        schemas = wrap(schemaKey, schemas) // eslint-disable-line require-atomic-updates
      }

      return await pluckFields(schemaKey ? unwrap(schemaKey, schemas) : schemas)
    },

    async getFields({ schemaKey, fields, ...options }: CF.Get) {
      const pluckFields = pluckResultFields(fields)
      const schemas = await api.get({ schemaKey, ...options })

      if (!schemas) {
        return schemas
      }

      if (schemaKey) {
        return pluckFields(schemas.fields)
      }

      return keys(schemas).reduce(
        (acc, key) =>
          Object.assign(acc, {
            [key]: pluckFields(schemas[key].fields)
          }),
        {}
      )
    },

    subscribeRaw({ schemaKey, callback, ...options }: CF.Subscribe) {
      const filtered = applyOptionsForCF(api.ref(schemaKey), options)

      const args = []

      if (!context.usesAdminApp) {
        args.push({
          includeMetadataChanges: !!options.includeMetadataChanges
        })
      }

      args.push(
        (snapshot: any) => callback(null, snapshot),
        (err: Error) => callback(err, null)
      )

      return filtered.onSnapshot(...args)
    },

    subscribe({ schemaKey, callback, changeType, ...options }: CF.Subscribe) {
      const pluckFields = pluckResultFields(options.fields)

      return api.subscribeRaw({
        schemaKey,
        ...options,
        async callback(err, snapshot) {
          if (err) {
            return callback(err, null)
          }

          if (snapshot.empty) {
            return callback(null, null)
          }

          const schemas: any = {}

          if (changeType) {
            snapshot.docChanges().forEach((change: any) => {
              if (change.type === changeType) {
                const data = change.doc.data()
                schemas[get(data, '_fl_meta_.fl_id', change.doc.id)] = data
              }
            })

            if (!keys(schemas).length) {
              return
            }
          } else {
            snapshot.forEach((doc: any) => {
              const data = doc.data()
              schemas[get(data, '_fl_meta_.fl_id', doc.id)] = data
            })
          }

          const plucked = pluckFields(schemas)
          return callback(null, schemaKey ? plucked[schemaKey] : plucked)
        }
      })
    },

    subscribeFields({
      schemaKey,
      fields,
      callback,
      changeType,
      ...options
    }: CF.Subscribe) {
      const pluckFields = pluckResultFields(fields)

      return api.subscribeRaw({
        schemaKey,
        ...options,
        async callback(err, snapshot) {
          if (err) {
            return callback(err, null)
          }

          if (snapshot.empty) {
            return callback(null, null)
          }

          const schemaFields: any = {}

          if (changeType) {
            snapshot.docChanges().forEach((change: any) => {
              if (change.type === changeType) {
                const data = change.doc.data()
                schemaFields[get(data, '_fl_meta_.fl_id', change.doc.id)] = get(
                  data,
                  'fields'
                )
              }
            })

            if (!keys(schemaFields).length) {
              return
            }
          } else {
            snapshot.forEach((doc: any) => {
              const data = doc.data()
              schemaFields[get(data, '_fl_meta_.fl_id', doc.id)] = get(
                data,
                'fields'
              )
            })
          }

          const plucked = schemaKey
            ? pluckFields(schemaFields[schemaKey])
            : keys(schemaFields).reduce((acc, sKey) => {
                return Object.assign(acc, {
                  [sKey]: pluckFields(schemaFields[sKey])
                })
              }, {})

          return callback(null, plucked)
        }
      })
    },

    async add({ schemaKey, data }: CF.Add) {
      if (typeof schemaKey !== 'string' || typeof data !== 'object') {
        throw new FlamelinkError(
          '"add" called with the incorrect arguments. Check the docs for details.'
        )
      }

      const firestoreService = flamelink._ensureService('firestore', context)
      const schemasRef = firestoreService.collection(SCHEMAS_COLLECTION)
      const docRef = schemasRef.doc()
      const docId = docRef.id

      const payload = Object.assign({}, data, {
        _fl_meta_: {
          createdBy: getCurrentUser(context),
          createdDate: getTimestamp(context),
          env: context.env,
          docId,
          fl_id: schemaKey
        },
        description: data.description || '',
        enabled:
          typeof data.enabled === 'undefined' ? true : Boolean(data.enabled),
        fields: data.fields ? castArray(data.fields) : [],
        group: data.group || '',
        icon: data.icon || '',
        id: schemaKey,
        sortable:
          typeof data.sortable === 'undefined' ? true : Boolean(data.sortable),
        title: data.title || schemaKey,
        type: data.type || 'collection'
      })

      await docRef.set(payload)

      return payload
    },

    async update({ schemaKey, data }: CF.Update) {
      if (typeof schemaKey !== 'string' || typeof data !== 'object') {
        throw new FlamelinkError(
          '"update" called with the incorrect arguments. Check the docs for details.'
        )
      }

      const snapshot = await api.ref(schemaKey).get()

      if (snapshot.empty) {
        logWarning(
          `No schema existed with a key of "${schemaKey}" - creating new schema instead.`
        )
        return api.add({ schemaKey, data })
      }

      const schemas: any[] = []
      snapshot.forEach((doc: any) => schemas.push(doc))

      const schema = schemas[0]

      const payload = Object.assign({}, data, {
        '_fl_meta_.createdBy': schema.get('_fl_meta_.createdBy'),
        '_fl_meta_.createdDate': schema.get('_fl_meta_.createdDate'),
        '_fl_meta_.lastModifiedBy': getCurrentUser(context),
        '_fl_meta_.lastModifiedDate': getTimestamp(context),
        '_fl_meta_.fl_id': schemaKey,
        id: schemaKey
      })

      await schema.ref.update(payload)

      return payload
    },

    async remove({ schemaKey }: CF.Remove) {
      if (!schemaKey) {
        throw new FlamelinkError(
          '"remove" called with the incorrect arguments. Check the docs for details.'
        )
      }

      const snapshot = await api.getRaw({ schemaKey })

      if (snapshot.empty) {
        // Nothing to delete
        return
      }

      const schemaDocChunks: any[] = chunk(snapshot.docs, CF_BATCH_WRITE_LIMIT)
      const db = flamelink._ensureService('firestore', context)

      const batchQueue = createQueue(async (schemaDocChunk: any[]) => {
        const batch = db.batch()
        schemaDocChunk.forEach((schemaDoc: any) => batch.delete(schemaDoc.ref))
        return batch.commit()
      }, schemaDocChunks)

      return batchQueue.start()
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
          callback(err, schemas) {
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

export default factory
