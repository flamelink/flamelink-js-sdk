export type ModuleName =
  | 'content'
  | 'schemas'
  | 'settings'
  | 'nav'
  | 'users'
  | 'storage'

export interface FlamelinkConfig {
  firebaseApp: any
  env?: string
  locale?: string
  dbType?: 'rtdb' | 'cf'
}

export interface FlamelinkPublicApi {
  content: any
  schemas: any
  storage: any
  nav: any
  settings: any
  users: any
}

export interface FlamelinkFactory {
  (config: FlamelinkConfig): FlamelinkPublicApi
  _registerModule(moduleName: ModuleName, setupModule: SetupModule): void
}

export interface FlamelinkFactoryCreator {
  (): FlamelinkFactory
}

export interface FlamelinkContext extends FlamelinkConfig {
  modules: any
  proxySupported: boolean
}

export type SetupModule = (context: FlamelinkContext) => any

export interface RegisteredModule {
  moduleName: ModuleName
  setupModule: SetupModule
}
