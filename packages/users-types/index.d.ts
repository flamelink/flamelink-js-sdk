import { FlamelinkContext } from '@flamelink/sdk-app-types'

export interface UsersPublicApi {
  get(): any
}

export type FlamelinkUsersFactory = (
  context: FlamelinkContext
) => UsersPublicApi
