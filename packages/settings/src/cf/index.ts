import { FlamelinkSettingsFactory } from '@flamelink/sdk-settings-types'

const factory: FlamelinkSettingsFactory = context => {
  console.log('settings from cf', context)

  return {
    setEnvironment: (env: string) => {
      context.env = env
      return env
    },
    getEnvironment: (): string => context.env,
    setLocale: (locale: string) => {
      context.locale = locale
      return locale
    },
    getLocale: (): string => context.locale,
    getGlobals: () => {},
    getImageSizes: () => {},
    getDefaultPermissionsGroup: () => {}
  }
}

export default factory
