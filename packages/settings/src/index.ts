import flamelink from '@flamelink/sdk-app'
import { SetupModule } from '@flamelink/sdk-app'

const settings: SetupModule = context => {
  // If any bootstrapping is required, do it here

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

export default flamelink._registerModule('settings', settings)
