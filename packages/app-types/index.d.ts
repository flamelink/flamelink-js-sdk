export type ModuleName =
  | 'content'
  | 'schemas'
  | 'settings'
  | 'nav'
  | 'users'
  | 'storage'

export type FirebaseService = 'auth' | 'database' | 'firestore' | 'storage'

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
  _ensureService(serviceName: FirebaseService, context: FlamelinkContext): any
}

export interface FlamelinkFactoryCreator {
  (): FlamelinkFactory
}

export interface FlamelinkContext extends FlamelinkConfig {
  modules: any
  services: any
  proxySupported: boolean
  usesAdminApp: boolean
}

export type SetupModule = (context: FlamelinkContext) => any

export interface RegisteredModule {
  moduleName: ModuleName
  setupModule: SetupModule
}
