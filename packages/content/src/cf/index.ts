import get from 'lodash/get'
import keys from 'lodash/keys'
import values from 'lodash/values'
import chunk from 'lodash/chunk'
import castArray from 'lodash/castArray'
import compose from 'compose-then'
import flamelink from '@flamelink/sdk-app'
import { FlamelinkFactory, Api, CF } from '@flamelink/sdk-content-types'
import {
  applyOptionsForCF,
  pluckResultFields,
  logWarning,
  FlamelinkError,
  createQueue,
  getTimestamp,
  getCurrentUser,
  populateEntriesForCF,
  patchFileUrlForCF
} from '@flamelink/sdk-utils'
import { CF_BATCH_WRITE_LIMIT } from '../constants'

const CONTENT_COLLECTION = 'fl_content'

const factory: FlamelinkFactory = context => {
  const api: Api = {
    ref(ref) {
      const firestoreService = flamelink._ensureService('firestore', context)
      const [schemaKey, entryId] = castArray(ref)

      let baseRef = firestoreService
        .collection(CONTENT_COLLECTION)
        .where('_fl_meta_.env', '==', context.env)
        .where('_fl_meta_.locale', '==', context.locale)

      if (schemaKey) {
        baseRef = baseRef.where('_fl_meta_.schema', '==', schemaKey)
      }

      return entryId ? baseRef.where('_fl_meta_.fl_id', '==', entryId) : baseRef
    },

    getRaw({ schemaKey, entryId, ...options }: CF.Get) {
      return applyOptionsForCF(api.ref([schemaKey, entryId]), options).get({
        source: options.source || 'default'
      })
    },

    async get({ schemaKey, entryId, ...options }: CF.Get = {}) {
      const pluckFields = pluckResultFields(options.fields)
      const patchFileUrl = patchFileUrlForCF(
        context,
        schemaKey,
        entryId,
        options
      )

      const snapshot = await api.getRaw({ schemaKey, entryId, ...options })

      if (snapshot.empty) {
        return null
      }

      const firestoreService = flamelink._ensureService('firestore', context)
      const processRefs = populateEntriesForCF(firestoreService, options)

      const schema = await get(context, 'modules.schemas').get({ schemaKey })
      const isSingleType = get(schema, 'type') === 'single'

      const content: any = {}
      snapshot.forEach((doc: any) => {
        const data = doc.data()
        content[get(data, '_fl_meta_.fl_id', doc.id)] = data
      })

      const result = await compose(
        pluckFields,
        patchFileUrl,
        processRefs
      )(content)

      if (isSingleType) {
        return values(result)[0]
      }

      return entryId ? get(result, entryId) : result
    },

    async getByField({
      schemaKey,
      field,
      value,
      filters,
      ...options
    }: CF.GetByField) {
      const pluckFields = pluckResultFields(options.fields)
      const content = await api.get({
        schemaKey,
        ...options,
        filters: (filters || []).concat([[field, '==', value]])
      })

      if (!content) {
        return content
      }

      return keys(content).reduce((acc: object, key: string) => {
        const contentEntry: any = content[key]
        return Object.assign(acc, { [key]: pluckFields(contentEntry) })
      }, {})
    },

    subscribeRaw({ schemaKey, entryId, callback, ...options }: CF.Subscribe) {
      const filtered = applyOptionsForCF(api.ref([schemaKey, entryId]), options)

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

    subscribe({
      schemaKey,
      entryId,
      callback,
      changeType,
      ...options
    }: CF.Subscribe) {
      const pluckFields = pluckResultFields(options.fields)
      const firestoreService = flamelink._ensureService('firestore', context)
      const processRefs = populateEntriesForCF(firestoreService, options)
      const patchFileUrl = patchFileUrlForCF(
        context,
        schemaKey,
        entryId,
        options
      )

      return api.subscribeRaw({
        schemaKey,
        entryId,
        ...options,
        async callback(err, snapshot) {
          if (err) {
            return callback(err, null)
          }

          if (snapshot.empty) {
            return callback(null, null)
          }

          const content: any = {}

          if (changeType) {
            snapshot.docChanges().forEach((change: any) => {
              if (change.type === changeType) {
                const data = change.doc.data()
                content[get(data, '_fl_meta_.fl_id', change.doc.id)] = data
              }
            })

            if (!content.length) {
              return
            }
          } else {
            snapshot.forEach((doc: any) => {
              const data = doc.data()
              content[get(data, '_fl_meta_.fl_id', doc.id)] = data
            })
          }

          const result = await compose(
            pluckFields,
            patchFileUrl,
            processRefs
          )(content)

          // Handle content for single type schemas
          if (schemaKey && !entryId) {
            const schemaValues = values(result)

            if (
              schemaValues.length === 1 &&
              get(schemaValues[0], '_fl_meta_.schemaType') === 'single'
            ) {
              return callback(null, schemaValues[0])
            }
          }

          return callback(null, entryId ? result[entryId] : result)
        }
      })
    },

    async add({ schemaKey, entryId, data }: CF.Add) {
      if (!schemaKey) {
        throw new FlamelinkError(
          `Please provide the content entry's "schemaKey"`
        )
      }

      const schemasAPI = get(context, 'modules.schemas', {
        getFields() {
          throw new FlamelinkError(
            'The "schemas" module is required. Please ensure it is properly imported.'
          )
        }
      })

      const schemaRef = schemasAPI.ref(schemaKey)
      const schema = await schemasAPI.get({
        schemaKey
      })

      const defaultValues = get(schema, 'fields', []).reduce(
        (acc: any, field: any) =>
          Object.assign(acc, {
            [field.key]: get(field, 'defaultValue', null)
          }),
        {}
      )

      const firestoreService = flamelink._ensureService('firestore', context)
      const contentRef = firestoreService.collection(CONTENT_COLLECTION)
      const docRef = contentRef.doc()
      const docId = docRef.id

      const payload =
        typeof data === 'object'
          ? {
              ...defaultValues,
              ...data,
              _fl_meta_: {
                createdBy: getCurrentUser(context),
                createdDate: getTimestamp(context),
                env: context.env,
                docId,
                fl_id: entryId || docId,
                schema: schemaKey,
                schemaType: get(schema, 'type', 'collection'),
                schemaRef
              },
              id: entryId || docId
            }
          : data

      return docRef.set(payload)
    },

    async update({ schemaKey, entryId, data }: CF.Update) {
      if (!schemaKey || !entryId || typeof data !== 'object') {
        throw new FlamelinkError(
          '"update" called with the incorrect arguments. Check the docs for details.'
        )
      }

      const payload =
        typeof data === 'object'
          ? Object.assign({}, data, {
              '_fl_meta_.lastModifiedBy': getCurrentUser(context),
              '_fl_meta_.lastModifiedDate': getTimestamp(context),
              '_fl_meta_.fl_id': entryId,
              id: entryId
            })
          : data

      const snapshot = await api.ref([schemaKey, entryId]).get()

      if (snapshot.empty) {
        logWarning(
          `No entry existed for schema "${schemaKey}" with ID "${entryId}" - creating new entry instead.`
        )
        return api.add({ schemaKey, data })
      }

      const content: any[] = []
      snapshot.forEach((doc: any) => content.push(doc))

      return await content[0].ref.update(payload)
    },

    async remove({ schemaKey, entryId }: CF.Remove) {
      const snapshot = await api.getRaw({ schemaKey, entryId })

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

  return api
}

export default factory
