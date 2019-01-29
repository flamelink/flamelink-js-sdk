import { FlamelinkSettingsFactory } from '@flamelink/sdk-settings-types'

const factory: FlamelinkSettingsFactory = context => {
  console.log('settings from rtdb', context)

  return {
    setEnvironment: env => {
      context.env = env
      return env
    },
    getEnvironment: () => context.env,
    setLocale: locale => {
      context.locale = locale
      return locale
    },
    getLocale: () => context.locale,
    getGlobals: () => {},
    getImageSizes: () => {},
    getDefaultPermissionsGroup: () => {}
  }
}

export default factory
