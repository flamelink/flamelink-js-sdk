import App from '@flamelink/sdk-app-types'

interface GetArgsForRTDB extends App.RTDB.Options {
  navigationKey?: string
}

interface UpsertArgsForRTDB extends App.RTDB.Options {
  navigationKey: string
  data: any
}

interface SubscribeArgsForRTDB extends App.RTDB.Options {
  navigationKey?: string
  callback: App.SubscriptionCallback
}

interface GetArgsForCF extends App.CF.Options {}

interface UpsertArgsForCF extends App.CF.Options {
  navigationKey: string
  data: any
}

interface SubscribeArgsForCF extends App.CF.Options {
  callback: App.SubscriptionCallback
}

export interface NavigationPublicApi {
  ref(navigationRef?: string | string[]): any

  getRaw(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  get(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  getItemsRaw?(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  getItems(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  subscribeRaw(
    args: SubscribeArgsForRTDB | SubscribeArgsForCF
  ): App.UnsubscribeMethod

  subscribe(
    args: SubscribeArgsForRTDB | SubscribeArgsForCF
  ): App.UnsubscribeMethod

  add(args: UpsertArgsForRTDB | UpsertArgsForCF): Promise<any>

  update(args: UpsertArgsForRTDB | UpsertArgsForCF): Promise<any>

  remove(args: GetArgsForRTDB | GetArgsForCF): Promise<any>
}

export type FlamelinkNavigationFactory = (
  context: App.Context
) => NavigationPublicApi
