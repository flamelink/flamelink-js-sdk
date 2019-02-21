import {
  FlamelinkContext,
  OptionsForRTDB,
  OptionsForCF,
  SubscriptionCallback,
  UnsubscribeMethod
} from '@flamelink/sdk-app-types'

interface GetArgsForRTDB extends OptionsForRTDB {
  schemaKey?: string
}

interface UpsertArgsForRTDB extends OptionsForRTDB {
  schemaKey: string
  data: any
}

interface SubscribeArgsForRTDB extends OptionsForRTDB {
  schemaKey?: string
  callback: SubscriptionCallback
}

interface GetArgsForCF extends OptionsForCF {}

interface UpsertArgsForCF extends OptionsForCF {
  schemaKey: string
  data: any
}

interface SubscribeArgsForCF extends OptionsForCF {
  callback: SubscriptionCallback
}

export interface SchemasPublicApi {
  ref(schemaRef?: string): any

  getRaw(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  get(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  getFieldsRaw?(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  getFields(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  subscribeRaw(
    args: SubscribeArgsForRTDB | SubscribeArgsForCF
  ): UnsubscribeMethod

  subscribe(args: SubscribeArgsForRTDB | SubscribeArgsForCF): UnsubscribeMethod

  add(args: UpsertArgsForRTDB | UpsertArgsForCF): Promise<any>

  update(args: UpsertArgsForRTDB | UpsertArgsForCF): Promise<any>

  remove(args: GetArgsForRTDB | GetArgsForCF): Promise<any>
}

export type FlamelinkSchemasFactory = (
  context: FlamelinkContext
) => SchemasPublicApi
