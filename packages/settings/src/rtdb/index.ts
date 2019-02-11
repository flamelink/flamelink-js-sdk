import flamelink from '@flamelink/sdk-app'
import {
  FlamelinkSettingsFactory,
  SettingsPublicApi,
  UnsubscribeMethod
} from '@flamelink/sdk-settings-types'
import {
  getSettingsRefPath,
  applyOrderBy,
  applyFilters,
  pluckResultFields
} from './helpers'

const factory: FlamelinkSettingsFactory = context => {
  const api: SettingsPublicApi = {
    ref(ref) {
      const dbService = flamelink._ensureService('database', context)
      return dbService.ref(getSettingsRefPath(ref))
    },

    getRaw({ settingsKey, ...options }) {
      const ordered = applyOrderBy(api.ref(settingsKey), options)
      const filtered = applyFilters(ordered, options)
      return filtered.once(options.event || 'value')
    },

    async get({ settingsKey, ...options }) {
      const pluckFields = pluckResultFields(options.fields)
      const snapshot = await api.getRaw({ settingsKey, ...options })
      const value =
        options.needsWrap && settingsKey
          ? { [settingsKey]: snapshot.val() }
          : snapshot.val()
      const result = await pluckFields(value)
      return options.needsWrap ? result[settingsKey] : result
    },

    setEnvironment: async env => {
      context.env = env
      return env
    },

    getEnvironment: async () => context.env,

    // TODO: Consider checking for supported locales - if we want - don't want to make API request
    setLocale: async locale => {
      context.locale = locale
      return locale
    },

    getLocale: async () => context.locale,

    getGlobals: async (options = {}) =>
      api.get({ ...options, needsWrap: true, settingsKey: 'globals' }),

    subscribeRaw: ({ settingsKey, callback, ...options }) => {
      const ordered = applyOrderBy(api.ref(settingsKey), options)
      const filtered = applyFilters(ordered, options)

      filtered.on(
        options.event || 'value',
        (snapshot: any) => callback(null, snapshot),
        (err: Error) => callback(err, null)
      )

      const unsubscribe: UnsubscribeMethod = () =>
        filtered.off(options.event || 'value')
      return unsubscribe
    },

    subscribe: ({ settingsKey, callback, ...options }) => {
      const pluckFields = pluckResultFields(options.fields)

      return api.subscribeRaw({
        settingsKey,
        ...options,
        callback: async (err, snapshot) => {
          if (err) {
            return callback(err, null)
          }

          const value =
            options.needsWrap && settingsKey
              ? { [settingsKey]: snapshot.val() }
              : snapshot.val()
          const result = await pluckFields(value)

          return callback(
            null,
            options.needsWrap && settingsKey ? result[settingsKey] : result
          )
        }
      })
    },

    subscribeGlobals: options =>
      api.subscribe({ ...options, settingsKey: 'globals' }),

    getImageSizes: async (options = {}) =>
      api.get({ ...options, settingsKey: 'general/imageSizes' }),

    getDefaultPermissionsGroup: async (options = {}) =>
      api.get({
        ...options,
        settingsKey: 'general/defaultPermissionsGroup'
      })
  }

  return api
}

export default factory
