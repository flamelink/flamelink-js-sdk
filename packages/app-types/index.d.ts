// eslint-disable-next-line no-redeclare
declare namespace App {
  type SubscriptionCallback = (error: Error | null, data: any) => any
  type UnsubscribeMethod = () => any
  type StringOrNumber = string | number

  type ModuleName =
    | 'content'
    | 'schemas'
    | 'settings'
    | 'nav'
    | 'users'
    | 'storage'

  interface Modules {
    content?: any
    schemas?: any
    settings?: any
    nav?: any
    users?: any
    storage?: any
  }

  type FirebaseService = 'auth' | 'database' | 'firestore' | 'storage'

  interface PrecacheOptions {
    schemas?: string[]
  }

  type SetupModule = (context: Context) => any

  interface RegisteredModule {
    moduleName: ModuleName
    setupModule: SetupModule
  }

  interface Factory {
    (config: Config): PublicApi
    _registerModule(moduleName: ModuleName, setupModule: SetupModule): void
    _ensureService(serviceName: FirebaseService, context: Context): any
  }

  interface FactoryCreator {
    (): Factory
  }

  interface PublicApi {
    content: any
    schemas: any
    storage: any
    nav: any
    settings: any
    users: any
  }

  interface Config {
    firebaseApp: any
    env?: string
    locale?: string
    dbType?: 'rtdb' | 'cf'
    precache?: boolean | PrecacheOptions
  }

  interface Context extends Config {
    modules: Modules
    services: any
    cache?: any
    emitter?: EventEmitter.Emitter
    proxySupported: boolean
    usesAdminApp: boolean
    isNodeEnvironment?: boolean
  }

  namespace EventEmitter {
    type Listener = (...args: any[]) => void

    interface Events {
      [event: string]: Listener[]
    }
    interface Emitter {
      on(event: string, listener: Listener): () => void
      off(event: string, listener: Listener): void
      offAll(): void
      emit(event: string, ...args: any[]): void
      once(event: string, listener: Listener): () => void
    }
  }

  namespace RTDB {
    interface OrderByOptions {
      orderByChild?: string
      orderByValue?: boolean
      orderByKey?: boolean
    }

    interface FilterOptions {
      limitToFirst?: number
      limitToLast?: number
      startAt?: string | number
      endAt?: string | number
      equalTo?: string | number
      [x: string]: any
    }

    interface Options extends OrderByOptions, FilterOptions {
      needsWrap?: boolean
      event?: string
      fields?: string[]
    }
    interface Snapshot {
      val(): any
      [x: string]: any
    }
  }

  namespace CF {
    interface OrderByField {
      field: string
      order?: string
    }

    interface OrderByOptions {
      orderBy?: string | string[] | OrderByField | OrderByField[]
    }

    type FilterClause = [string, string, any]

    interface FilterOptions {
      filters?: FilterClause[]
    }

    interface LimitOptions {
      startAt?: StringOrNumber | StringOrNumber[]
      startAfter?: StringOrNumber | StringOrNumber[]
      endAt?: StringOrNumber | StringOrNumber[]
      endBefore?: StringOrNumber | StringOrNumber[]
      limit?: number
      [x: string]: any
    }

    interface Options extends OrderByOptions, FilterOptions {
      changeType?: string
      fields?: string[]
      [x: string]: any
    }

    interface DocumentSnapshot {
      data(): any
      [x: string]: any
    }

    type CollectionSnapshotForEach = (doc: DocumentSnapshot) => void

    interface CollectionSnapshot {
      empty: boolean
      forEach(fn: CollectionSnapshotForEach): void
      [x: string]: any
    }
  }
}

export = App
