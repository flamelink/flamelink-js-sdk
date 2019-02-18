import {
  FlamelinkContext,
  OptionsForRTDB,
  OptionsForCF,
  SubscriptionCallback,
  UnsubscribeMethod
} from '@flamelink/sdk-app-types'

interface GetArgsForRTDB extends OptionsForRTDB {
  settingsKey?: string
}

interface SubscribeArgsForRTDB extends OptionsForRTDB {
  settingsKey?: string
  callback: SubscriptionCallback
}

interface GetArgsForCF extends OptionsForCF {}

interface SubscribeArgsForCF extends OptionsForCF {
  callback: SubscriptionCallback
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
  ): UnsubscribeMethod

  subscribe(args: SubscribeArgsForRTDB | SubscribeArgsForCF): UnsubscribeMethod

  subscribeGlobals(
    args: SubscribeArgsForRTDB | SubscribeArgsForCF
  ): UnsubscribeMethod

  subscribeImageSizes(
    args: SubscribeArgsForRTDB | SubscribeArgsForCF
  ): UnsubscribeMethod

  subscribeDefaultPermissionsGroup(
    args: SubscribeArgsForRTDB | SubscribeArgsForCF
  ): UnsubscribeMethod
}

export type FlamelinkSettingsFactory = (
  context: FlamelinkContext
) => SettingsPublicApi
