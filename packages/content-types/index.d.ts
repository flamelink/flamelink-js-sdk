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

interface GetArgsForCF extends OptionsForCF {
  schemaKey?: string
}

interface UpsertArgsForCF extends OptionsForCF {
  schemaKey: string
  data: any
}

interface SubscribeArgsForCF extends OptionsForCF {
  callback: SubscriptionCallback
}

export interface ContentPublicApi {
  ref(args?: string | string[]): any

  getRaw(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  get(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  getByFieldRaw?(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  getByField(args: GetArgsForRTDB | GetArgsForCF): Promise<any>

  subscribeRaw(
    args: SubscribeArgsForRTDB | SubscribeArgsForCF
  ): UnsubscribeMethod

  subscribe(args: SubscribeArgsForRTDB | SubscribeArgsForCF): UnsubscribeMethod

  add(args: UpsertArgsForRTDB | UpsertArgsForCF): Promise<any>

  update(args: UpsertArgsForRTDB | UpsertArgsForCF): Promise<any>

  remove(args: GetArgsForRTDB | GetArgsForCF): Promise<any>
}

export type FlamelinkContentFactory = (
  context: FlamelinkContext
) => ContentPublicApi
