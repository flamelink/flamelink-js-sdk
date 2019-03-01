import App from '@flamelink/sdk-app-types'

export interface UsersPublicApi {
  get(): any
}

export type FlamelinkUsersFactory = (context: App.Context) => UsersPublicApi
