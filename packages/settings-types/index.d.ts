import { FlamelinkContext } from '@flamelink/sdk-app-types'

export interface SettingsPublicApi {
  setEnvironment(env: string): string
  getEnvironment(): string
  setLocale(locale: string): string
  getLocale(): string
  getGlobals(): any
  getImageSizes(): any
  getDefaultPermissionsGroup(): any
}

export type FlamelinkSettingsFactory = (
  context: FlamelinkContext
) => SettingsPublicApi
