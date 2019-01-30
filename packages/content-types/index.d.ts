import { FlamelinkContext } from '@flamelink/sdk-app-types'

export interface ContentPublicApi {
  get(): any
  getByField(): any
  subscribe(): any
  unsubscribe(): any
  set(): any
  update(): any
  remove(): any
  transaction(): any
  ref(): any
}

export type FlamelinkContentFactory = (
  context: FlamelinkContext
) => ContentPublicApi
