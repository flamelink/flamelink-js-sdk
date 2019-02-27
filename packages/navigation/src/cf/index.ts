import chunk from 'lodash/chunk'
import castArray from 'lodash/castArray'
import flamelink from '@flamelink/sdk-app'
import {
  FlamelinkNavigationFactory,
  NavigationPublicApi
} from '@flamelink/sdk-navigation-types'
import {
  applyOptionsForCF,
  pluckResultFields,
  logWarning,
  FlamelinkError,
  createQueue,
  getTimestamp,
  getCurrentUser
} from '@flamelink/sdk-utils'
import { structureItems } from '../helpers'
import { CF_BATCH_WRITE_LIMIT } from '../constants'

const NAVIGATION_COLLECTION = 'fl_navigation'

const REQUIRED_FIELDS_FOR_STRUCTURING = ['uuid', 'parentIndex', 'children']

const factory: FlamelinkNavigationFactory = context => {
  const api: NavigationPublicApi = {
    ref(navigationKey) {
      const firestoreService = flamelink._ensureService('firestore', context)

      const baseRef = firestoreService
        .collection(NAVIGATION_COLLECTION)
        .where('_fl_meta_.env', '==', context.env)
        .where('_fl_meta_.locale', '==', context.locale)

      return navigationKey
        ? baseRef.where('_fl_meta_.fl_id', '==', navigationKey)
        : baseRef
    },

    getRaw({ navigationKey, ...options }) {
      return applyOptionsForCF(api.ref(navigationKey), options).get({
        source: options.source || 'default'
      })
    },

    async get({ navigationKey, ...options } = {}) {
      const fieldsToPluck =
        Array.isArray(options.fields) && options.structure
          ? new Set(REQUIRED_FIELDS_FOR_STRUCTURING.concat(options.fields))
          : options.fields

      const pluckFields = pluckResultFields(fieldsToPluck)

      const snapshot = await api.getRaw({ navigationKey, ...options })

      const navigation: any[] = []
      snapshot.forEach((doc: any) => navigation.push(doc.data()))

      const plucked = pluckFields(navigation).map((nav: any) =>
        structureItems(options, nav)
      )
      return navigationKey ? plucked[0] : plucked
    },

    async getItems({ navigationKey, fields, structure, ...options }) {
      const fieldsToPluck = Array.isArray(fields)
        ? new Set(REQUIRED_FIELDS_FOR_STRUCTURING.concat(fields))
        : fields
      const pluckFields = pluckResultFields(fieldsToPluck)
      const navigation = await api.get({ navigationKey, ...options })

      if (!navigation) {
        return navigation
      }

      if (navigationKey) {
        return pluckFields(navigation.items).map((nav: any) =>
          structureItems(options, nav)
        )
      }

      return navigation
        .map((nav: any) => pluckFields(nav.items))
        .map((nav: any) => structureItems(options, nav))
    },

    subscribeRaw({ navigationKey, callback, ...options }) {
      const filtered = applyOptionsForCF(api.ref(navigationKey), options)

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

    subscribe({ navigationKey, callback, changeType, ...options }) {
      const fieldsToPluck =
        Array.isArray(options.fields) && options.structure
          ? new Set(REQUIRED_FIELDS_FOR_STRUCTURING.concat(options.fields))
          : options.fields

      const pluckFields = pluckResultFields(fieldsToPluck)

      return api.subscribeRaw({
        navigationKey,
        ...options,
        async callback(err, snapshot) {
          if (err) {
            return callback(err, null)
          }

          if (snapshot.empty) {
            return callback(null, [])
          }

          const navigation: any[] = []

          if (changeType) {
            snapshot.docChanges().forEach((change: any) => {
              if (change.type === changeType) {
                navigation.push(change.doc.data())
              }
            })

            if (!navigation.length) {
              return
            }
          } else {
            snapshot.forEach((doc: any) => navigation.push(doc.data()))
          }

          const plucked = pluckFields(navigation).map((nav: any) =>
            structureItems(options, nav)
          )
          return callback(null, navigationKey ? plucked[0] : plucked)
        }
      })
    },

    add({ navigationKey, data }) {
      if (!navigationKey) {
        throw new FlamelinkError(
          `Please provide the navigation's "navigationKey"`
        )
      }

      const firestoreService = flamelink._ensureService('firestore', context)
      const navigationRef = firestoreService.collection(NAVIGATION_COLLECTION)
      const docRef = navigationRef.doc()
      const docId = docRef.id

      const payload =
        typeof data === 'object'
          ? Object.assign({}, data, {
              _fl_meta_: {
                createdBy: getCurrentUser(context),
                createdDate: getTimestamp(context),
                env: context.env,
                docId,
                fl_id: navigationKey
              },
              items: castArray(data.items) || [],
              id: navigationKey,
              title: data.title || navigationKey
            })
          : data

      return docRef.set(payload)
    },

    async update({ navigationKey, data }) {
      if (typeof navigationKey !== 'string' || typeof data !== 'object') {
        throw new FlamelinkError(
          '"update" called with the incorrect arguments. Check the docs for details.'
        )
      }

      const payload =
        typeof data === 'object'
          ? Object.assign({}, data, {
              '_fl_meta_.lastModifiedBy': getCurrentUser(context),
              '_fl_meta_.lastModifiedDate': getTimestamp(context),
              '_fl_meta_.fl_id': navigationKey,
              id: navigationKey
            })
          : data

      const snapshot = await api.ref(navigationKey).get()

      if (snapshot.empty) {
        logWarning(
          `No navigation existed with a key of "${navigationKey}" - creating new navigation instead.`
        )
        return api.add({ navigationKey, data })
      }

      const navigation: any[] = []
      snapshot.forEach((doc: any) => navigation.push(doc))

      return await navigation[0].ref.update(payload)
    },

    async remove({ navigationKey }) {
      const snapshot = await api.getRaw({ navigationKey })

      if (snapshot.empty) {
        // Nothing to delete
        return
      }

      const navigationDocChunks: any[] = chunk(
        snapshot.docs,
        CF_BATCH_WRITE_LIMIT
      )
      const db = flamelink._ensureService('firestore', context)

      const batchQueue = createQueue(async (navigationDocChunk: any[]) => {
        const batch = db.batch()
        navigationDocChunk.forEach((navigationDoc: any) =>
          batch.delete(navigationDoc)
        )
        return batch.commit()
      }, navigationDocChunks)

      return batchQueue.start()
    }
  }

  return api
}

export default factory
