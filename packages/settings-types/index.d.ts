import { FlamelinkContext } from '@flamelink/sdk-app-types'

export interface SettingsPublicApi {
  /**
   * @description Set the environment to be used for the flamelink app instance
   * @param {String} `environment` The environment to set
   * @returns {Promise} Resolves to given environment
   */
  setEnvironment(env: string): Promise<string>

  /**
   * @description Get the environment set for the flamelink app instance
   * @returns {Promise} Resolves to set environment
   */
  getEnvironment(): Promise<string>

  /**
   * @description Set the locale to be used for the flamelink app instance
   * @param {String} `locale` The locale to set
   * @returns {Promise} Resolves to given locale
   */
  setLocale(locale: string): Promise<string>

  /**
   * @description Get the locale set for the flamelink app instance
   * @returns {Promise} Resolves to set locale
   */
  getLocale(): Promise<string>

  getGlobals(): any

  getImageSizes(): any

  getDefaultPermissionsGroup(): any
}

export type FlamelinkSettingsFactory = (
  context: FlamelinkContext
) => SettingsPublicApi
