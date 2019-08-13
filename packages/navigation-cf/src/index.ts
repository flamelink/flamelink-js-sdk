import keys from 'lodash/keys'
import get from 'lodash/get'
import chunk from 'lodash/chunk'
import castArray from 'lodash/castArray'
import compose from 'compose-then'
import flamelink from '@flamelink/sdk-app'
import * as App from '@flamelink/sdk-app-types'
import { FlamelinkFactory, Api, CF } from '@flamelink/sdk-navigation-types'
import {
  applyOptionsForCF,
  pluckResultFields,
  logWarning,
  FlamelinkError,
  createQueue,
  getTimestamp,
  getCurrentUser
} from '@flamelink/sdk-utils'
import { structureItems } from './helpers'
import { BATCH_WRITE_LIMIT, REQUIRED_FIELDS_FOR_STRUCTURING } from './constants'

const NAVIGATION_COLLECTION = 'fl_navigation'

export const factory: FlamelinkFactory = context => {
  const api: Api = {
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

    getRaw({ navigationKey, ...options }: CF.Get) {
      return applyOptionsForCF(api.ref(navigationKey), options).get({
        source: options.source || 'default'
      })
    },

    async get({ navigationKey, ...options }: CF.Get = {}) {
      const fieldsToPluck =
        Array.isArray(options.fields) && options.structure
          ? Array.from(
              new Set(REQUIRED_FIELDS_FOR_STRUCTURING.concat(options.fields))
            )
          : options.fields

      const pluckFields = pluckResultFields(fieldsToPluck)

      const snapshot = await api.getRaw({ navigationKey, ...options })

      const navigation: any = {}
      snapshot.forEach((doc: any) => {
        const data = doc.data()
        navigation[get(data, '_fl_meta_.fl_id', doc.id)] = data
      })

      const structureNavItems = structureItems(options)

      const plucked = keys(navigation).reduce((acc: any, key: string) => {
        const nav: any = navigation[key]
        return Object.assign(acc, {
          [key]: structureNavItems(pluckFields(nav))
        })
      }, {})

      return navigationKey ? plucked[navigationKey] : plucked
    },

    async getItems({ navigationKey, fields, structure, ...options }: CF.Get) {
      const fieldsToPluck = Array.isArray(fields)
        ? Array.from(new Set(REQUIRED_FIELDS_FOR_STRUCTURING.concat(fields)))
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

    subscribeRaw({ navigationKey, callback, ...options }: CF.Subscribe) {
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

    subscribe({
      navigationKey,
      callback,
      changeType,
      ...options
    }: CF.Subscribe) {
      const fieldsToPluck =
        Array.isArray(options.fields) && options.structure
          ? Array.from(
              new Set(REQUIRED_FIELDS_FOR_STRUCTURING.concat(options.fields))
            )
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
            return callback(null, null)
          }

          const navigation: any = {}

          if (changeType) {
            snapshot.docChanges().forEach((change: any) => {
              if (change.type === changeType) {
                const data = change.doc.data()
                navigation[get(data, '_fl_meta_.fl_id', change.doc.id)] = data
              }
            })

            if (!keys(navigation).length) {
              return
            }
          } else {
            snapshot.forEach((doc: any) => {
              const data = doc.data()
              navigation[get(data, '_fl_meta_.fl_id', doc.id)] = data
            })
          }

          const structureNavItems = structureItems(options)

          const plucked = await keys(navigation).reduce((chain, key) => {
            const nav: any = navigation[key]
            return chain.then(async (acc: any) =>
              Object.assign(acc, {
                [key]: await compose(
                  pluckFields,
                  structureNavItems
                )(nav)
              })
            )
          }, Promise.resolve({}))

          return callback(
            null,
            navigationKey ? plucked[navigationKey] : plucked
          )
        }
      })
    },

    async add({ navigationKey, data }: CF.Add) {
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

      await docRef.set(payload)

      return payload
    },

    async update({ navigationKey, data }: CF.Update) {
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

      await navigation[0].ref.update(payload)

      return payload
    },

    async remove({ navigationKey }: CF.Remove) {
      const snapshot = await api.getRaw({ navigationKey })

      if (snapshot.empty) {
        // Nothing to delete
        return
      }

      const navigationDocChunks: any[] = chunk(snapshot.docs, BATCH_WRITE_LIMIT)
      const db = flamelink._ensureService('firestore', context)

      const batchQueue = createQueue(async (navigationDocChunk: any[]) => {
        const batch = db.batch()
        navigationDocChunk.forEach((navigationDoc: any) =>
          batch.delete(navigationDoc.ref)
        )
        return batch.commit()
      }, navigationDocChunks)

      return batchQueue.start()
    }
  }

  return api
}

export const register: App.SetupModule = (context: App.Context) => {
  if (context.dbType === 'cf') {
    return factory(context)
  }

  return null
}

flamelink._registerModule('nav', register)
