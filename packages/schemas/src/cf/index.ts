import get from 'lodash/get'
import set from 'lodash/set'
import chunk from 'lodash/chunk'
import castArray from 'lodash/castArray'
import flamelink from '@flamelink/sdk-app'
import {
  FlamelinkSchemasFactory,
  SchemasPublicApi
} from '@flamelink/sdk-schemas-types'
import {
  applyOptionsForCF,
  pluckResultFields,
  hasNonCacheableOptionsForCF,
  logError,
  logWarning,
  FlamelinkError,
  createQueue,
  getTimestamp,
  getCurrentUser
} from '@flamelink/sdk-utils'
import { CF_BATCH_WRITE_LIMIT } from '../constants'

const SCHEMAS_COLLECTION = 'fl_schemas'

const factory: FlamelinkSchemasFactory = context => {
  const api: SchemasPublicApi = {
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

    getRaw({ schemaKey, ...options }) {
      return applyOptionsForCF(api.ref(schemaKey), options).get({
        source: options.source || 'default'
      })
    },

    async get({ schemaKey, ...options } = {}) {
      const pluckFields = pluckResultFields(options.fields)

      let schemas: any[] = get(context, `cache.schemas[${context.env}]`, [])

      if (schemaKey) {
        schemas = schemas.filter(
          schema => get(schema, '_fl_meta_.fl_id') === schemaKey
        )
      }

      if (
        !schemas.length ||
        (schemaKey &&
          !schemas.find(
            (schema: any) => get(schema, '_fl_meta_.fl_id') === schemaKey
          )) ||
        hasNonCacheableOptionsForCF(options)
      ) {
        const snapshot = await api.getRaw({ schemaKey, ...options })

        if (snapshot.empty) {
          return []
        }

        snapshot.forEach((doc: any) => schemas.push(doc.data()))
      }

      const plucked = pluckFields(schemas)
      return schemaKey ? plucked[0] : plucked
    },

    async getFields({ schemaKey, fields, ...options }) {
      const pluckFields = pluckResultFields(fields)
      const schemas = await api.get({ schemaKey, ...options })

      if (!schemas) {
        return schemas
      }

      if (schemaKey) {
        return pluckFields(schemas.fields)
      }

      return schemas.map((schema: any) => pluckFields(schema.fields))
    },

    subscribeRaw({ schemaKey, callback, ...options }) {
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

    subscribe({ schemaKey, callback, changeType, ...options }) {
      const pluckFields = pluckResultFields(options.fields)

      return api.subscribeRaw({
        schemaKey,
        ...options,
        async callback(err, snapshot) {
          if (err) {
            return callback(err, null)
          }

          if (snapshot.empty) {
            return callback(null, [])
          }

          const schemas: any[] = []

          if (changeType) {
            snapshot.docChanges().forEach((change: any) => {
              if (change.type === changeType) {
                schemas.push(change.doc.data())
              }
            })

            if (!schemas.length) {
              return
            }
          } else {
            snapshot.forEach((doc: any) => schemas.push(doc.data()))
          }

          const plucked = pluckFields(schemas)
          return callback(null, schemaKey ? plucked[0] : plucked)
        }
      })
    },

    subscribeFields({ schemaKey, fields, callback, changeType, ...options }) {
      const pluckFields = pluckResultFields(fields)

      return api.subscribeRaw({
        schemaKey,
        ...options,
        async callback(err, snapshot) {
          if (err) {
            return callback(err, null)
          }

          if (snapshot.empty) {
            return callback(null, [])
          }

          const schemaFields: any[] = []

          if (changeType) {
            snapshot.docChanges().forEach((change: any) => {
              if (change.type === changeType) {
                schemaFields.push(pluckFields(change.doc.data().fields))
              }
            })

            if (!schemaFields.length) {
              return
            }
          } else {
            snapshot.forEach((doc: any) =>
              schemaFields.push(pluckFields(doc.data().fields))
            )
          }

          return callback(null, schemaKey ? schemaFields[0] : schemaFields)
        }
      })
    },

    add({ schemaKey, data }) {
      if (!schemaKey) {
        throw new FlamelinkError(`Please provide the schema's "schemaKey"`)
      }

      const firestoreService = flamelink._ensureService('firestore', context)
      const schemasRef = firestoreService.collection(SCHEMAS_COLLECTION)
      const docRef = schemasRef.doc()
      const docId = docRef.id

      const payload =
        typeof data === 'object'
          ? Object.assign({}, data, {
              _fl_meta_: {
                createdBy: getCurrentUser(context),
                createdDate: getTimestamp(context),
                env: context.env,
                docId,
                fl_id: schemaKey
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

      return docRef.set(payload)
    },

    async update({ schemaKey, data }) {
      if (typeof schemaKey !== 'string' || typeof data !== 'object') {
        throw new FlamelinkError(
          '"update" called with the incorrect arguments. Check the docs for details.'
        )
      }

      const payload =
        typeof data === 'object'
          ? Object.assign({}, data, {
              '_fl_meta_.lastModifiedBy': getCurrentUser(context),
              '_fl_meta_.lastModifiedDate': getTimestamp(context),
              '_fl_meta_.fl_id': schemaKey,
              id: schemaKey
            })
          : data

      const snapshot = await api.ref(schemaKey).get()

      if (snapshot.empty) {
        logWarning(
          `No schema existed with a key of "${schemaKey}" - creating new schema instead.`
        )
        return api.add({ schemaKey, data })
      }

      const schemas: any[] = []
      snapshot.forEach((doc: any) => schemas.push(doc))

      return await schemas[0].ref.update(payload)
    },

    async remove({ schemaKey }) {
      const snapshot = await api.getRaw({ schemaKey })

      if (snapshot.empty) {
        // Nothing to delete
        return
      }

      const schemaDocChunks: any[] = chunk(snapshot.docs, CF_BATCH_WRITE_LIMIT)
      const db = flamelink._ensureService('firestore', context)

      const batchQueue = createQueue(async (schemaDocChunk: any[]) => {
        const batch = db.batch()
        schemaDocChunk.forEach((schemaDoc: any) => batch.delete(schemaDoc))
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

            if (!schemaKey) {
              return set(context, `cache.schemas[${context.env}]`, schemas)
            }

            const schemasCache = get(
              context,
              `cache.schemas[${context.env}]`,
              []
            )

            const newCache = schemasCache
              .filter(
                (schema: any) => get(schema, '_fl_meta_.fl_id') !== schemaKey
              )
              .concat(schemas)

            return set(context, `cache.schemas[${context.env}]`, newCache)
          }
        })
      })
    }
  }

  // Only start precaching when the user starts interacting with this API
  context.emitter.once('schema:ref', subscribeAndCacheSchemas)

  return api
}

export default factory
