import {
  FlamelinkContext,
  OptionsForRTDB,
  SnapshotForRTDB,
  OptionsForCF,
  SnapshotForCF
} from '@flamelink/sdk-app-types'

export type UnsubscribeMethod = () => any

export type SubscriptionCallback = (error: Error | null, data: any) => any

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

  getRaw?(args: GetArgsForRTDB | GetArgsForCF): Promise<SnapshotForRTDB>

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
