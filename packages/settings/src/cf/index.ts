import {
  FlamelinkSettingsFactory,
  SettingsPublicApi
} from '@flamelink/sdk-settings-types'

const factory: FlamelinkSettingsFactory = context => {
  const api: SettingsPublicApi = {
    setEnvironment: async env => {
      context.env = env
      return env
    },

    getEnvironment: async () => context.env,

    setLocale: async locale => {
      // TODO: Consider checking for supported locales - if we want - don't want to make API request
      context.locale = locale
      return locale
    },

    getLocale: async () => context.locale,

    getGlobals: async () => {},

    getImageSizes: async () => {},

    getDefaultPermissionsGroup: async () => {}
  }

  return api
}

export default factory
