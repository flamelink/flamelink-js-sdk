import get from 'lodash/get'
import keys from 'lodash/keys'
import values from 'lodash/values'
import chunk from 'lodash/chunk'
import castArray from 'lodash/castArray'
import compose from 'compose-then'
import flamelink from '@flamelink/sdk-app'
import { FlamelinkFactory, Api, CF } from '@flamelink/sdk-content-types'
import { Schema, SchemaField, SchemaFields } from '@flamelink/sdk-schemas-types'
import {
  applyOptionsForCF,
  pluckResultFields,
  logWarning,
  FlamelinkError,
  createQueue,
  getTimestamp,
  getCurrentUser,
  populateEntriesForCF
} from '@flamelink/sdk-utils'
import { CF_BATCH_WRITE_LIMIT } from '../constants'
import '@flamelink/sdk-schemas-cf'

const CONTENT_COLLECTION = 'fl_content'
const SCHEMAS_COLLECTION = 'fl_schemas'

const factory: FlamelinkFactory = context => {
  const api: Api = {
    ref(ref, options) {
      const firestoreService = flamelink._ensureService('firestore', context)
      const [schemaKey, entryId] = castArray(ref)

      let baseRef = firestoreService
        .collection(CONTENT_COLLECTION)
        .where('_fl_meta_.env', '==', get(options, 'env', context.env))
        .where('_fl_meta_.locale', '==', get(options, 'locale', context.locale))

      if (schemaKey) {
        baseRef = baseRef.where('_fl_meta_.schema', '==', schemaKey)
      }

      return entryId ? baseRef.where('_fl_meta_.fl_id', '==', entryId) : baseRef
    },

    getRaw({ schemaKey, entryId, ...options }: CF.Get) {
      return applyOptionsForCF(
        api.ref([schemaKey, entryId], options),
        options
      ).get({
        source: options.source || 'default'
      })
    },

    async get({ schemaKey, entryId, ...options }: CF.Get = {}) {
      const snapshot = await api.getRaw({ schemaKey, entryId, ...options })

      if (snapshot.empty) {
        return null
      }

      const processRefs = populateEntriesForCF(context, options)
      const pluckFields = pluckResultFields(options.fields)

      const content: any = {}
      snapshot.forEach((doc: any) => {
        const data = doc.data()
        content[get(data, '_fl_meta_.fl_id', doc.id)] = data
      })

      const [schema, result] = await Promise.all([
        get(context, 'modules.schemas').get({ schemaKey }),
        compose(
          pluckFields,
          processRefs
        )(content)
      ])

      const isSingleType = get(schema, 'type') === 'single'

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
      return api.get({
        schemaKey,
        ...options,
        filters: (filters || []).concat([[field, '==', value]])
      })
    },

    subscribeRaw({ schemaKey, entryId, callback, ...options }: CF.Subscribe) {
      const filtered = applyOptionsForCF(
        api.ref([schemaKey, entryId], options),
        options
      )

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
      const processRefs = populateEntriesForCF(context, options)

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

            if (!keys(content).length) {
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
        get() {
          throw new FlamelinkError(
            'The "schemas" module is required. Please ensure it is properly imported.'
          )
        }
      })

      const schema: Schema = await schemasAPI.get({
        schemaKey
      })

      const schemaFields: SchemaFields = get(schema, 'fields', [])

      const defaultValues = schemaFields.reduce(
        (acc: object, field: SchemaField) =>
          Object.assign(acc, {
            [field.key]: get(field, 'defaultValue', null)
          }),
        {}
      )

      const firestoreService = flamelink._ensureService('firestore', context)

      let createDefaultEntry = false
      let defaultLocale = ''

      const defaultLocaleDoc = await firestoreService
        .doc('fl_settings/defaultLocale')
        .get()

      if (defaultLocaleDoc.exists) {
        defaultLocale = defaultLocaleDoc.data().key

        if (defaultLocale !== context.locale) {
          const defaultEntry = await api.get({
            schemaKey,
            entryId,
            locale: defaultLocale
          })

          if (!defaultEntry) {
            createDefaultEntry = true
          }
        }
      }

      const schemaRef = firestoreService.doc(
        `${SCHEMAS_COLLECTION}/${schemaKey}`
      )
      const contentRef = firestoreService.collection(CONTENT_COLLECTION)
      const docRef = contentRef.doc()
      const docId = docRef.id

      const payload =
        typeof data === 'object'
          ? {
              ...defaultValues,
              order: 0,
              parentId: 0,
              ...data,
              _fl_meta_: {
                createdBy: getCurrentUser(context),
                createdDate: getTimestamp(context),
                docId,
                env: context.env,
                fl_id: entryId || docId,
                locale: context.locale,
                schema: schemaKey,
                schemaType: get(schema, 'type', 'collection'),
                schemaRef
              },
              id: docId
            }
          : data

      await docRef.set(payload)

      if (createDefaultEntry) {
        const defaultDocRef = contentRef.doc()
        const defaultDocId = defaultDocRef.id
        const defaultPayload = {
          _fl_meta_: {
            ...payload._fl_meta_,
            docId: defaultDocId,
            locale: defaultLocale,
            createdFromLocale: context.locale
          },
          id: defaultDocId,
          order: get(payload, 'order', 0),
          parentId: get(payload, 'parentId', 0)
        }

        await defaultDocRef.set(defaultPayload)
      }

      return payload
    },

    async update({ schemaKey, entryId, data }: CF.Update) {
      if (!schemaKey || !entryId || typeof data !== 'object') {
        throw new FlamelinkError(
          '"update" called with the incorrect arguments. Check the docs for details.'
        )
      }

      const payload =
        typeof data === 'object'
          ? {
              ...data,
              '_fl_meta_.lastModifiedBy': getCurrentUser(context),
              '_fl_meta_.lastModifiedDate': getTimestamp(context),
              '_fl_meta_.fl_id': entryId,
              id: entryId
            }
          : data

      const snapshot = await api.ref([schemaKey, entryId]).get()

      if (snapshot.empty) {
        logWarning(
          `No entry existed for schema "${schemaKey}" with ID "${entryId}" - creating new entry instead.`
        )
        return api.add({ schemaKey, entryId, data })
      }

      const content: any[] = []
      snapshot.forEach((doc: any) => content.push(doc))

      await content[0].ref.update(payload)

      return payload
    },

    async remove({ schemaKey, entryId }: CF.Remove) {
      const snapshot = await api.getRaw({ schemaKey, entryId })

      if (snapshot.empty) {
        // Nothing to delete
        return
      }

      const contentDocChunks: any[] = chunk(snapshot.docs, CF_BATCH_WRITE_LIMIT)
      const db = flamelink._ensureService('firestore', context)

      const batchQueue = createQueue(async (contentDocChunk: any[]) => {
        const batch = db.batch()
        contentDocChunk.forEach((contentDoc: any) =>
          batch.delete(contentDoc.ref)
        )
        return batch.commit()
      }, contentDocChunks)

      return batchQueue.start()
    }
  }

  return api
}

export default factory
