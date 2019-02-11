import {
  FlamelinkContext,
  OptionsForRTDB,
  SnapshotForRTDB
} from '@flamelink/sdk-app-types'

export type UnsubscribeMethod = () => any

export type SubscriptionCallback = (error: Error | null, data: any) => any

interface GetArgs extends OptionsForRTDB {
  settingsKey?: string
}

interface SubscribeArgs extends OptionsForRTDB {
  settingsKey?: string
  callback: SubscriptionCallback
}

export interface SettingsPublicApi {
  /**
   * @description Establish and return a reference to path in Firebase RTDB
   * @param {String} ref
   * @returns {Object} Ref object
   */
  ref?(settingsKey?: string): any

  /**
   * @description Get snapshot for given settings reference
   * @param {String} settingsKey
   * @param {Object} [options={}]
   * @returns {Promise} Resolves to snapshot of query
   */
  getRaw?(args: GetArgs): Promise<SnapshotForRTDB>

  /**
   * @description Read value once from db
   * @param {String} settingsKey
   * @param {Object} [options={}]
   * @returns {Promise} Resolves to value of query
   */
  get?(args: GetArgs): Promise<any>

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

  /**
   * Returns the global meta data for the flamelink app
   * @returns {Promise} Resolves with globals object
   */
  getGlobals(): Promise<any>

  /**
   * @description Establish stream to read value consistently from db, returning the raw snapshot
   * @param {String} settingsKey
   * @param {Object} [options={}]
   * @param {Function} callback
   * @returns {Function} Function that can be used to unsubscribe the subscription
   */
  subscribeRaw(args: SubscribeArgs): UnsubscribeMethod

  /**
   * @description Establish stream to read value consistently from db, returning the processed value
   * @param {String} settingsKey
   * @param {Object} [options={}]
   * @param {Function} callback
   * @returns {Function} Function that can be used to unsubscribe the subscription
   */
  subscribe(args: SubscribeArgs): UnsubscribeMethod

  /**
   * @description Establish stream to read value consistently from db, returning the processed value
   * @param {Function} callback
   * @returns {Function} Function that can be used to unsubscribe the subscription
   */
  subscribeGlobals(args: SubscribeArgs): UnsubscribeMethod

  /**
   * Returns the set image sizes for the flamelink app
   * @returns {Promise} Resolves with array of image size objects
   */
  getImageSizes(): Promise<any>

  /**
   * Returns the ID of the default permissions group for the flamelink app
   * @returns {Promise} Resolves with ID of permissions group
   */
  getDefaultPermissionsGroup(): Promise<any>
}

export type FlamelinkSettingsFactory = (
  context: FlamelinkContext
) => SettingsPublicApi
