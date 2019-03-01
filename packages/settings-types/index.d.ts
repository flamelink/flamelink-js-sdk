import App from '@flamelink/sdk-app-types'

interface GetArgsForRTDB extends App.RTDB.Options {
  settingsKey?: string
}

interface SubscribeArgsForRTDB extends App.RTDB.Options {
  settingsKey?: string
  callback: App.SubscriptionCallback
}

interface GetArgsForCF extends App.CF.Options {}

interface SubscribeArgsForCF extends App.CF.Options {
  callback: App.SubscriptionCallback
}

export interface SettingsPublicApi {
  ref?(referenceKey: string): any

  getRaw?(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  get?(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  setEnvironment(env: string): Promise<string>

  getEnvironment(): Promise<string>

  setLocale(locale: string): Promise<string>

  getLocale(): Promise<string>

  getGlobals(): Promise<any>

  getImageSizes(): Promise<any>

  getDefaultPermissionsGroup(): Promise<any>

  subscribeRaw(
    args: SubscribeArgsForRTDB | SubscribeArgsForCF
  ): App.UnsubscribeMethod

  subscribe(
    args: SubscribeArgsForRTDB | SubscribeArgsForCF
  ): App.UnsubscribeMethod

  subscribeGlobals(
    args: SubscribeArgsForRTDB | SubscribeArgsForCF
  ): App.UnsubscribeMethod

  subscribeImageSizes(
    args: SubscribeArgsForRTDB | SubscribeArgsForCF
  ): App.UnsubscribeMethod

  subscribeDefaultPermissionsGroup(
    args: SubscribeArgsForRTDB | SubscribeArgsForCF
  ): App.UnsubscribeMethod
}

export type FlamelinkSettingsFactory = (
  context: App.Context
) => SettingsPublicApi
