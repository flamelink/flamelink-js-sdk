import { FlamelinkContext } from '@flamelink/sdk-app-types'

export interface NavigationPublicApi {
  get(): any
  getItems(): any
  subscribe(): any
  unsubscribe(): any
  set(): any
  update(): any
  remove(): any
  transaction(): any
  ref(): any
}

export type FlamelinkNavigationFactory = (
  context: FlamelinkContext
) => NavigationPublicApi
