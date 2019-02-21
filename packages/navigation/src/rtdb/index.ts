import get from 'lodash/get'
import keys from 'lodash/keys'
import castArray from 'lodash/castArray'
import flamelink from '@flamelink/sdk-app'
import { UnsubscribeMethod } from '@flamelink/sdk-app-types'
import {
  FlamelinkNavigationFactory,
  NavigationPublicApi
} from '@flamelink/sdk-navigation-types'
import {
  applyOptionsForRTDB,
  pluckResultFields,
  hasNonCacheableOptionsForRTDB,
  FlamelinkError,
  getTimestamp,
  getCurrentUser
} from '@flamelink/sdk-utils'
import { getNavigationRefPath, structureItems } from './helpers'

const factory: FlamelinkNavigationFactory = context => {
  const api: NavigationPublicApi = {
    ref(navigationRef) {
      const dbService = flamelink._ensureService('database', context)
      return dbService.ref(
        getNavigationRefPath(navigationRef, context.env, context.locale)
      )
    },

    getRaw({ navigationKey, ...options }) {
      return applyOptionsForRTDB(api.ref(navigationKey), options).once(
        options.event || 'value'
      )
    },

    async get({ navigationKey, ...options } = {}) {
      const pluckFields = pluckResultFields(options.fields)

      const snapshot = await api.getRaw({ navigationKey, ...options })

      if (navigationKey) {
        const wrappedNav = await pluckFields({
          [navigationKey]: snapshot.val()
        })
        const nav = wrappedNav[navigationKey]

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

    getItemsRaw({ navigationKey, ...options }) {
      return applyOptionsForRTDB(
        api.ref(navigationKey ? `${navigationKey}/items` : ''),
        options
      ).once(options.event || 'value')
    },

    async getItems({ navigationKey, ...options }) {
      const pluckFields = pluckResultFields(options.fields)

      const navigationCache = get(
        context,
        `cache.navigations[${context.env}]${
          navigationKey ? `.${navigationKey}` : ''
        }`
      )

      if (navigationKey) {
        let fields = get(navigationCache, 'fields', null)

        if (!fields || hasNonCacheableOptionsForRTDB(options)) {
          const snapshot = await api.getItemsRaw({ navigationKey, ...options })
          fields = snapshot.val()
        }

        return await pluckFields(fields)
      }

      let navigations = navigationCache

      if (!navigations || hasNonCacheableOptionsForRTDB(options)) {
        const snapshot = await api.getItemsRaw(options)
        navigations = snapshot.val()
      }

      return keys(navigations).reduce(
        (acc, key) =>
          Object.assign(acc, {
            [key]: pluckFields(navigations[key].fields)
          }),
        {}
      )
    },

    subscribeRaw({ navigationKey, callback, ...options }) {
      const filteredRef = applyOptionsForRTDB(api.ref(navigationKey), options)

      filteredRef.on(
        options.event || 'value',
        (snapshot: any) => callback(null, snapshot),
        (err: Error) => callback(err, null)
      )

      const unsubscribe: UnsubscribeMethod = () =>
        filteredRef.off(options.event || 'value')
      return unsubscribe
    },

    subscribe({ navigationKey, callback, ...options }) {
      const pluckFields = pluckResultFields(options.fields)

      return api.subscribeRaw({
        navigationKey,
        ...options,
        async callback(err, snapshot) {
          if (err) {
            return callback(err, null)
          }

          const value = navigationKey
            ? { [navigationKey]: snapshot.val() }
            : snapshot.val()
          const result = await pluckFields(value)

          return callback(null, navigationKey ? result[navigationKey] : result)
        }
      })
    },

    add({ navigationKey, data }) {
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
              fields: castArray(data.fields) || [],
              group: data.group || '',
              icon: data.icon || '',
              id: navigationKey,
              sortable:
                typeof data.sortable === 'undefined'
                  ? true
                  : Boolean(data.sortable),
              title: data.title || navigationKey,
              type: data.type || 'collection'
            })
          : data

      return api.ref(navigationKey).set(payload)
    },

    update({ navigationKey, data }) {
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
          ? Object.assign({}, data, {
              '__meta__/lastModifiedBy': getCurrentUser(context),
              '__meta__/lastModifiedDate': getTimestamp(context),
              id: navigationKey
            })
          : data

      return api.ref(navigationKey).update(payload)
    },

    remove({ navigationKey }) {
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

export default factory
