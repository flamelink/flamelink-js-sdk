import App from '@flamelink/sdk-app-types'

interface GetArgsForRTDB extends App.RTDB.Options {
  schemaKey?: string
}

interface UpsertArgsForRTDB extends App.RTDB.Options {
  schemaKey: string
  data: any
}

interface SubscribeArgsForRTDB extends App.RTDB.Options {
  schemaKey?: string
  callback: App.SubscriptionCallback
}

interface GetArgsForCF extends App.CF.Options {
  schemaKey?: string
}

interface UpsertArgsForCF extends App.CF.Options {
  schemaKey: string
  data: any
}

interface SubscribeArgsForCF extends App.CF.Options {
  schemaKey?: string
  callback: App.SubscriptionCallback
}

export interface SchemasPublicApi {
  ref(schemaRef?: string): any

  getRaw(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  get(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  getFieldsRaw?(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  getFields(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  subscribeRaw(
    args: SubscribeArgsForRTDB | SubscribeArgsForCF
  ): App.UnsubscribeMethod

  subscribe(
    args: SubscribeArgsForRTDB | SubscribeArgsForCF
  ): App.UnsubscribeMethod

  subscribeFields(
    args: SubscribeArgsForRTDB | SubscribeArgsForCF
  ): App.UnsubscribeMethod

  add(args: UpsertArgsForRTDB | UpsertArgsForCF): Promise<any>

  update(args: UpsertArgsForRTDB | UpsertArgsForCF): Promise<any>

  remove(args: GetArgsForRTDB | GetArgsForCF): Promise<any>
}

export type FlamelinkSchemasFactory = (context: App.Context) => SchemasPublicApi
