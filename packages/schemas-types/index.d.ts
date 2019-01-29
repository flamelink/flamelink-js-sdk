import { FlamelinkContext } from '@flamelink/sdk-app-types'

export interface SchemasPublicApi {
  get(): any
  getFields(): any
  subscribe(): any
  unsubscribe(): any
  set(): any
  update(): any
  remove(): any
  transaction(): any
  ref(): any
}

export type FlamelinkSchemasFactory = (
  context: FlamelinkContext
) => SchemasPublicApi
