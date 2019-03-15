import compose from 'compose-then'
import flamelink from '@flamelink/sdk-app'
import App from '@flamelink/sdk-app-types'
import { FlamelinkFactory, Api, RTDB } from '@flamelink/sdk-users-types'
import {
  applyOptionsForRTDB,
  pluckResultFields,
  FlamelinkError,
  getTimestamp,
  getCurrentUser,
  wrap,
  unwrap
} from '@flamelink/sdk-utils'
import { getUserRefPath } from './helpers'

const factory: FlamelinkFactory = context => {
  const api: Api = {
    ref(uid) {
      const dbService = flamelink._ensureService('database', context)
      return dbService.ref(getUserRefPath(uid))
    },

    getRaw({ uid, ...options }: RTDB.Get) {
      return applyOptionsForRTDB(api.ref(uid), options).once(
        options.event || 'value'
      )
    },

    async get({ uid, ...options }: RTDB.Get = {}) {
      const pluckFields = pluckResultFields(options.fields)
      const snapshot = await api.getRaw({ uid, ...options })

      if (uid) {
        return await compose(
          unwrap(uid),
          pluckFields,
          wrap(uid)
        )(snapshot.val())
      }

      return await pluckFields(snapshot.val())
    },

    subscribeRaw({ uid, callback, ...options }: RTDB.Subscribe) {
      const filteredRef = applyOptionsForRTDB(api.ref(uid), options)

      filteredRef.on(
        options.event || 'value',
        (snapshot: any) => callback(null, snapshot),
        (err: Error) => callback(err, null)
      )

      const unsubscribe: App.UnsubscribeMethod = () =>
        filteredRef.off(options.event || 'value')
      return unsubscribe
    },

    subscribe({ uid, callback, ...options }: RTDB.Subscribe) {
      try {
        const pluckFields = pluckResultFields(options.fields)

        return api.subscribeRaw({
          uid,
          ...options,
          async callback(err, snapshot) {
            if (err) {
              return callback(err, null)
            }

            if (uid) {
              const nav = await compose(
                unwrap(uid),
                pluckFields,
                wrap(uid)
              )(snapshot.val())

              return callback(null, nav) // Error-first callback
            }

            const pluckedMenus = await pluckFields(snapshot.val())

            return callback(null, pluckedMenus) // Error-first callback
          }
        })
      } catch (err) {
        return callback(err, null)
      }
    },

    addToDB({ uid, data }: RTDB.Add) {
      const payload =
        typeof data === 'object'
          ? Object.assign({}, data, {
              __meta__: {
                createdBy: getCurrentUser(context),
                createdDate: getTimestamp(context)
              },
              displayName: data.displayName || '',
              email: data.email || '',
              enabled: data.enabled || 'Yes',
              firstName: data.firstName || '',
              id: uid,
              lastName: data.lastName || '',
              permissions: data.permissions || '1'
            })
          : data

      return api.ref(uid).set(payload)
    },

    updateInDB({ uid, data }: RTDB.Update) {
      if (
        typeof uid !== 'string' ||
        (typeof data !== 'object' && data !== null)
      ) {
        throw new FlamelinkError(
          '"updateInDB" called with the incorrect arguments. Check the docs for details.'
        )
      }

      const payload =
        typeof data === 'object'
          ? Object.assign({}, data, {
              '__meta__/lastModifiedBy': getCurrentUser(context),
              '__meta__/lastModifiedDate': getTimestamp(context),
              id: uid
            })
          : data

      return api.ref(uid).update(payload)
    },

    removeFromDB({ uid }: RTDB.Remove) {
      if (!uid) {
        throw new FlamelinkError(
          '"removeFromDB" called with the incorrect arguments. Check the docs for details.'
        )
      }
      return api.ref(uid).remove()
    }
  }

  return api
}

export default factory
