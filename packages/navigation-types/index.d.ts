import {
  FlamelinkContext,
  OptionsForRTDB,
  OptionsForCF,
  SubscriptionCallback,
  UnsubscribeMethod
} from '@flamelink/sdk-app-types'

interface GetArgsForRTDB extends OptionsForRTDB {
  navigationKey?: string
}

interface UpsertArgsForRTDB extends OptionsForRTDB {
  navigationKey: string
  data: any
}

interface SubscribeArgsForRTDB extends OptionsForRTDB {
  navigationKey?: string
  callback: SubscriptionCallback
}

interface GetArgsForCF extends OptionsForCF {}

interface UpsertArgsForCF extends OptionsForCF {
  navigationKey: string
  data: any
}

interface SubscribeArgsForCF extends OptionsForCF {
  callback: SubscriptionCallback
}

export interface NavigationPublicApi {
  ref(navigationRef?: string): any

  getRaw(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  get(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  getItemsRaw?(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  getItems(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  subscribeRaw(
    args: SubscribeArgsForRTDB | SubscribeArgsForCF
  ): UnsubscribeMethod

  subscribe(args: SubscribeArgsForRTDB | SubscribeArgsForCF): UnsubscribeMethod

  add(args: UpsertArgsForRTDB | UpsertArgsForCF): Promise<any>

  update(args: UpsertArgsForRTDB | UpsertArgsForCF): Promise<any>

  remove(args: GetArgsForRTDB | GetArgsForCF): Promise<any>
}

export type FlamelinkNavigationFactory = (
  context: FlamelinkContext
) => NavigationPublicApi
