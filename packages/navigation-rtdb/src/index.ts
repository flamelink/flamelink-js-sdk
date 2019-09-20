import compose from 'compose-then'
import keys from 'lodash/keys'
import castArray from 'lodash/castArray'
import flamelink from '@flamelink/sdk-app'
import * as App from '@flamelink/sdk-app-types'
import { FlamelinkFactory, Api, RTDB } from '@flamelink/sdk-navigation-types'
import {
  applyOptionsForRTDB,
  pluckResultFields,
  FlamelinkError,
  getTimestamp,
  getCurrentUser,
  wrap,
  unwrap
} from '@flamelink/sdk-utils'
import { structureItems, getNavigationRefPath } from './helpers'

export const factory: FlamelinkFactory = context => {
  const api: Api = {
    ref(navigationRef) {
      const dbService = flamelink._ensureService('database', context)
      return dbService.ref(
        getNavigationRefPath(navigationRef, context.env, context.locale)
      )
    },

    getRaw({ navigationKey, ...options }: RTDB.Get) {
      return applyOptionsForRTDB(api.ref(navigationKey), options).once(
        options.event || 'value'
      )
    },

    async get({ navigationKey, ...options }: RTDB.Get = {}) {
      const pluckFields = pluckResultFields(options.fields)

      const snapshot = await api.getRaw({ navigationKey, ...options })

      if (navigationKey) {
        const nav = await compose(
          unwrap(navigationKey),
          pluckFields,
          wrap(navigationKey)
        )(snapshot.val())

        return structureItems(options, nav)
      }

      const withLocales = snapshot.val()

      const withoutLocales = keys(withLocales).reduce(
        (menus, key) =>
          Object.assign(menus, { [key]: withLocales[key][context.locale] }),
        {}
      )

      const pluckedMenus = await pluckFields(withoutLocales)

      return keys(pluckedMenus).reduce((menus, key) => {
        const nav = pluckedMenus[key]
        return Object.assign(menus, { [key]: structureItems(options, nav) })
      }, {})
    },

    getItemsRaw({ navigationKey, ...options }: RTDB.Get) {
      if (!navigationKey) {
        throw new FlamelinkError(
          '"getItems" method requires a navigation reference'
        )
      }

      return applyOptionsForRTDB(
        api.ref([navigationKey, `items`]),
        options
      ).once(options.event || 'value')
    },

    async getItems({ navigationKey, ...options }: RTDB.Get = {}) {
      const pluckFields = pluckResultFields(options.fields)
      const snapshot = await api.getItemsRaw({ navigationKey, ...options })

      return compose(
        pluckFields,
        unwrap('items'),
        structureItems(options),
        wrap('items')
      )(snapshot.val())
    },

    subscribeRaw({ navigationKey, callback, ...options }: RTDB.Subscribe) {
      const filteredRef = applyOptionsForRTDB(api.ref(navigationKey), options)

      filteredRef.on(
        options.event || 'value',
        (snapshot: firebase.database.DataSnapshot) => callback(null, snapshot),
        (err: Error) => callback(err, null)
      )

      const unsubscribe: App.UnsubscribeMethod = () =>
        filteredRef.off(options.event || 'value')
      return unsubscribe
    },

    subscribe({ navigationKey, callback, ...options }: RTDB.Subscribe) {
      try {
        const pluckFields = pluckResultFields(options.fields)

        return api.subscribeRaw({
          navigationKey,
          ...options,
          async callback(err, snapshot) {
            if (err) {
              return callback(err, null)
            }

            if (navigationKey) {
              const nav = await compose(
                unwrap(navigationKey),
                pluckFields,
                wrap(navigationKey)
              )(snapshot.val())

              return callback(null, structureItems(options, nav)) // Error-first callback
            }

            const withLocales = snapshot.val()

            const withoutLocales = keys(withLocales).reduce(
              (menus, key) =>
                Object.assign(menus, {
                  [key]: withLocales[key][context.locale]
                }),
              {}
            )

            const pluckedMenus = await pluckFields(withoutLocales)

            const result = keys(pluckedMenus).reduce((menus, key) => {
              const nav = pluckedMenus[key]
              return Object.assign(menus, {
                [key]: structureItems(options, nav)
              })
            }, {})

            return callback(null, result) // Error-first callback
          }
        })
      } catch (err) {
        return callback(err, null)
      }
    },

    async add({ navigationKey, data }: RTDB.Add) {
      const payload =
        typeof data === 'object'
          ? Object.assign({}, data, {
              __meta__: {
                createdBy: getCurrentUser(context),
                createdDate: getTimestamp(context)
              },
              items: castArray(data.items) || [],
              id: navigationKey,
              title: data.title || navigationKey
            })
          : data

      await api.ref(navigationKey).set(payload)

      return payload
    },

    async update({ navigationKey, data }: RTDB.Update) {
      if (
        typeof navigationKey !== 'string' ||
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
              id: navigationKey
            }
          : data

      await api.ref(navigationKey).update(payload)

      return payload
    },

    remove({ navigationKey }: RTDB.Remove) {
      if (!navigationKey) {
        throw new FlamelinkError(
          '"remove" called with the incorrect arguments. Check the docs for details.'
        )
      }
      return api.ref(navigationKey).remove()
    }
  }

  return api
}

export const register: App.SetupModule = (context: App.Context) => {
  if (context.dbType === 'rtdb') {
    return factory(context)
  }

  return null
}

flamelink._registerModule('nav', register)
