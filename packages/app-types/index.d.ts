export type ModuleName =
  | 'content'
  | 'schemas'
  | 'settings'
  | 'nav'
  | 'users'
  | 'storage'

export type FirebaseService = 'auth' | 'database' | 'firestore' | 'storage'

interface PrecacheOptions {
  schemas?: string[]
}

export interface FlamelinkConfig {
  firebaseApp: any
  env?: string
  locale?: string
  dbType?: 'rtdb' | 'cf'
  precache?: boolean | PrecacheOptions
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

interface FlamelinkModules {
  content?: any
  schemas?: any
  settings?: any
  nav?: any
  storage?: any
  users?: any
}

export interface FlamelinkContext extends FlamelinkConfig {
  modules: FlamelinkModules
  services: any
  cache?: any
  proxySupported: boolean
  usesAdminApp: boolean
  isNodeEnvironment?: boolean
}

export type SetupModule = (context: FlamelinkContext) => any

export interface RegisteredModule {
  moduleName: ModuleName
  setupModule: SetupModule
}

export type UnsubscribeMethod = () => any

export type SubscriptionCallback = (error: Error | null, data: any) => any

export interface OrderByOptionsForRTDB {
  orderByChild?: string
  orderByValue?: boolean
  orderByKey?: boolean
}

export interface FilterOptionsForRTDB {
  limitToFirst?: number
  limitToLast?: number
  startAt?: string | number
  endAt?: string | number
  equalTo?: string | number
  [x: string]: any
}

export interface OptionsForRTDB
  extends OrderByOptionsForRTDB,
    FilterOptionsForRTDB {
  needsWrap?: boolean
  event?: string
  fields?: string[]
}

export interface SnapshotForRTDB {
  val(): any
  [x: string]: any
}

export interface OrderByFieldForCF {
  field: string
  order?: string
}

export interface OrderByOptionsForCF {
  orderBy?: string | string[] | OrderByFieldForCF | OrderByFieldForCF[]
}

export type FilterClauseForCF = [string, string, any]

export interface FilterOptionsForCF {
  filters?: FilterClauseForCF[]
}

type StringOrNumber = string | number

export interface LimitOptionsForCF {
  startAt?: StringOrNumber | StringOrNumber[]
  startAfter?: StringOrNumber | StringOrNumber[]
  endAt?: StringOrNumber | StringOrNumber[]
  endBefore?: StringOrNumber | StringOrNumber[]
  limit?: number
  [x: string]: any
}

export interface OptionsForCF extends OrderByOptionsForCF, FilterOptionsForCF {
  document?: string
  changeType?: string
  fields?: string[]
  [x: string]: any
}

export interface DocumentSnapshotForCF {
  data(): any
  [x: string]: any
}

type CollectionSnapshotForEach = (doc: DocumentSnapshotForCF) => void

export interface CollectionSnapshotForCF {
  empty: boolean
  forEach(fn: CollectionSnapshotForEach): void
  [x: string]: any
}
