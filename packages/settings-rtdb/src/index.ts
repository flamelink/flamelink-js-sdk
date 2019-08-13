import flamelink from '@flamelink/sdk-app'
import * as App from '@flamelink/sdk-app-types'
import { FlamelinkFactory, Api, RTDB } from '@flamelink/sdk-settings-types'
import {
  applyOptionsForRTDB,
  pluckResultFields,
  wrap,
  unwrap
} from '@flamelink/sdk-utils'
import { getSettingsRefPath } from './helpers'

export const factory: FlamelinkFactory = context => {
  const api: Api = {
    ref(ref) {
      const dbService = flamelink._ensureService('database', context)
      return dbService.ref(getSettingsRefPath(ref))
    },

    getRaw({ settingsKey, ...options }: RTDB.Get) {
      return applyOptionsForRTDB(api.ref(settingsKey), options).once(
        options.event || 'value'
      )
    },

    async get({ settingsKey, ...options }: RTDB.Get) {
      const pluckFields = pluckResultFields(options.fields)
      const snapshot = await api.getRaw({ settingsKey, ...options })
      const value =
        options.needsWrap && settingsKey
          ? wrap(settingsKey, snapshot.val())
          : snapshot.val()
      const result = await pluckFields(value)
      return options.needsWrap ? unwrap(settingsKey, result) : result
    },

    async setEnvironment(env) {
      context.env = env
      return env
    },

    async getEnvironment() {
      return context.env
    },

    async setLocale(locale) {
      context.locale = locale
      return locale
    },

    async getLocale() {
      return context.locale
    },

    async getAvailableLocales() {
      return api.get({ settingsKey: 'locales' })
    },

    async getGlobals(options: RTDB.Get = {}) {
      return api.get({ ...options, needsWrap: true, settingsKey: 'globals' })
    },

    async getImageSizes(options: RTDB.Get = {}) {
      return api.get({ ...options, settingsKey: 'general/imageSizes' })
    },

    async getDefaultPermissionsGroup(options = {}) {
      return api.get({
        ...options,
        settingsKey: 'general/defaultPermissionsGroup'
      })
    },

    subscribeRaw({ settingsKey, callback, ...options }: RTDB.Subscribe) {
      const filteredRef = applyOptionsForRTDB(api.ref(settingsKey), options)

      filteredRef.on(
        options.event || 'value',
        (snapshot: any) => callback(null, snapshot),
        (err: Error) => callback(err, null)
      )

      const unsubscribe: App.UnsubscribeMethod = () =>
        filteredRef.off(options.event || 'value')
      return unsubscribe
    },

    subscribe({ settingsKey, callback, ...options }: RTDB.Subscribe) {
      const pluckFields = pluckResultFields(options.fields)

      return api.subscribeRaw({
        settingsKey,
        ...options,
        async callback(err, snapshot) {
          if (err) {
            return callback(err, null)
          }

          const value =
            options.needsWrap && settingsKey
              ? wrap(settingsKey, snapshot.val())
              : snapshot.val()
          const result = await pluckFields(value)

          return callback(
            null,
            options.needsWrap && settingsKey
              ? unwrap(settingsKey, result)
              : result
          )
        }
      })
    },

    subscribeGlobals(options: RTDB.Subscribe) {
      return api.subscribe({ ...options, settingsKey: 'globals' })
    },

    subscribeImageSizes(options: RTDB.Subscribe) {
      return api.subscribe({ ...options, settingsKey: 'general/imageSizes' })
    },

    subscribeDefaultPermissionsGroup(options: RTDB.Subscribe) {
      return api.subscribe({
        ...options,
        settingsKey: 'general/defaultPermissionsGroup'
      })
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

flamelink._registerModule('settings', register)
