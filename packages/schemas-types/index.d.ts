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

interface UpdateArgsForRTDB extends OptionsForRTDB {
  schemaKey: string
  updates: any
}

interface SubscribeArgsForRTDB extends OptionsForRTDB {
  schemaKey?: string
  callback: SubscriptionCallback
}

interface GetArgsForCF extends OptionsForCF {}

interface UpdateArgsForCF extends OptionsForCF {
  schemaKey: string
  updates: any
}

interface SubscribeArgsForCF extends OptionsForCF {
  callback: SubscriptionCallback
}

export interface SchemasPublicApi {
  ref(schemaRef: string): any

  getRaw(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  get(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  getFieldsRaw(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  getFields(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  subscribeRaw(
    args: SubscribeArgsForRTDB | SubscribeArgsForCF
  ): UnsubscribeMethod

  subscribe(args: SubscribeArgsForRTDB | SubscribeArgsForCF): UnsubscribeMethod

  add(payload: any): Promise<any>

  update(args: UpdateArgsForCF | UpdateArgsForCF): Promise<any>

  remove(args: GetArgsForRTDB | GetArgsForCF): Promise<any>
}

export type FlamelinkSchemasFactory = (
  context: FlamelinkContext
) => SchemasPublicApi
