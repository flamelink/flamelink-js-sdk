import keys from 'lodash/keys'
import get from 'lodash/get'
import chunk from 'lodash/chunk'
import flamelink from '@flamelink/sdk-app'
import { FlamelinkFactory, Api, CF } from '@flamelink/sdk-users-types'
import {
  applyOptionsForCF,
  pluckResultFields,
  logWarning,
  FlamelinkError,
  createQueue,
  getTimestamp,
  getCurrentUser,
  isRefLike,
  processReferencesForCF
} from '@flamelink/sdk-utils'
import { CF_BATCH_WRITE_LIMIT } from '../constants'

const USERS_COLLECTION = 'fl_users'
const PERMISSIONS_COLLECTION = 'fl_permissions'

const factory: FlamelinkFactory = context => {
  const api: Api = {
    ref(uid) {
      const firestoreService = flamelink._ensureService('firestore', context)
      const baseRef = firestoreService.collection(USERS_COLLECTION)
      return uid ? baseRef.where('_fl_meta_.docId', '==', uid) : baseRef
    },

    getRaw({ uid, ...options }: CF.Get) {
      return applyOptionsForCF(api.ref(uid), options).get({
        source: options.source || 'default'
      })
    },

    async get({ uid, ...options }: CF.Get = {}) {
      const pluckFields = pluckResultFields(options.fields)
      const firestoreService = flamelink._ensureService('firestore', context)
      const processRefs = processReferencesForCF(firestoreService, options)

      const snapshot = await api.getRaw({ uid, ...options })

      const users: any = {}
      snapshot.forEach((doc: any) => {
        const data = doc.data()
        users[get(data, 'id', doc.id)] = data
      })

      const plucked = await processRefs(pluckFields(users))
      return uid ? plucked[uid] : plucked
    },

    subscribeRaw({ uid, callback, ...options }: CF.Subscribe) {
      const filtered = applyOptionsForCF(api.ref(uid), options)

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

    subscribe({ uid, callback, changeType, ...options }: CF.Subscribe) {
      const pluckFields = pluckResultFields(options.fields)
      const firestoreService = flamelink._ensureService('firestore', context)
      const processRefs = processReferencesForCF(firestoreService, options)

      return api.subscribeRaw({
        uid,
        ...options,
        async callback(err, snapshot) {
          if (err) {
            return callback(err, null)
          }

          if (snapshot.empty) {
            return callback(null, [])
          }

          const users: any = {}

          if (changeType) {
            snapshot.docChanges().forEach((change: any) => {
              if (change.type === changeType) {
                const data = change.doc.data()
                users[get(data, 'id', change.doc.id)] = data
              }
            })

            if (!keys(users).length) {
              return
            }
          } else {
            snapshot.forEach((doc: any) => {
              const data = doc.data()
              users[get(data, 'id', doc.id)] = data
            })
          }

          const plucked: any = await processRefs(pluckFields(users))
          return callback(null, uid ? plucked[uid] : plucked)
        }
      })
    },

    _getPermissionsRef(permissions?: string) {
      const firestoreService = flamelink._ensureService('firestore', context)

      if (!permissions) {
        return firestoreService.doc(`${PERMISSIONS_COLLECTION}/1`)
      }

      if (isRefLike(permissions)) {
        return permissions
      }

      return firestoreService.doc(
        `${PERMISSIONS_COLLECTION}/${permissions
          .replace(PERMISSIONS_COLLECTION, '')
          .replace('/', '')}`
      )
    },

    async addToDB({ uid, data }: CF.Add) {
      if (!uid) {
        throw new FlamelinkError(`Please provide the user's "uid"`)
      }

      const payload =
        typeof data === 'object'
          ? Object.assign({}, data, {
              _fl_meta_: {
                createdBy: getCurrentUser(context),
                createdDate: getTimestamp(context),
                docId: uid
              },
              displayName: data.displayName || '',
              email: data.email || '',
              enabled: data.enabled || 'Yes',
              firstName: data.firstName || '',
              id: uid,
              lastName: data.lastName || '',
              ...(data.permissions
                ? { permissions: api._getPermissionsRef(data.permissions) }
                : {})
            })
          : data

      await api
        .ref()
        .doc(uid)
        .set(payload)

      return payload
    },

    async updateInDB({ uid, data }: CF.Update) {
      if (typeof uid !== 'string' || typeof data !== 'object') {
        throw new FlamelinkError(
          '"updateInDB" called with the incorrect arguments. Check the docs for details.'
        )
      }

      const payload = Object.assign({}, data, {
        '_fl_meta_.lastModifiedBy': getCurrentUser(context),
        '_fl_meta_.lastModifiedDate': getTimestamp(context),
        '_fl_meta_.docId': uid,
        id: uid,
        permissions: api._getPermissionsRef(data.permissions)
      })

      const snapshot = await api.ref(uid).get()

      if (snapshot.empty) {
        logWarning(
          `No user exists with a unique ID of "${uid}" - creating new user instead.`
        )
        return api.addToDB({ uid, data })
      }

      const users: any[] = []
      snapshot.forEach((doc: any) => users.push(doc))

      await users[0].ref.update(payload)

      return payload
    },

    async removeFromDB({ uid }: CF.Remove) {
      const snapshot = await api.getRaw({ uid })

      if (snapshot.empty) {
        // Nothing to delete
        return
      }

      const usersDocChunks: any[] = chunk(snapshot.docs, CF_BATCH_WRITE_LIMIT)
      const db = flamelink._ensureService('firestore', context)

      const batchQueue = createQueue(async (usersDocChunk: any[]) => {
        const batch = db.batch()
        usersDocChunk.forEach((usersDoc: any) => batch.delete(usersDoc.ref))
        return batch.commit()
      }, usersDocChunks)

      return batchQueue.start()
    }
  }

  return api
}

export default factory
