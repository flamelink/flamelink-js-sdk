// eslint-disable-next-line no-redeclare
declare namespace App {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type FixMe = any

  type SubscriptionCallback = (error: Error | null, data: FixMe) => FixMe
  type UnsubscribeMethod = () => FixMe
  type StringOrNumber = string | number

  type ModuleName =
    | 'content'
    | 'schemas'
    | 'settings'
    | 'nav'
    | 'users'
    | 'storage'

  interface Modules {
    content?: FixMe
    schemas?: FixMe
    settings?: FixMe
    nav?: FixMe
    users?: FixMe
    storage?: FixMe
  }

  type FirebaseService = 'auth' | 'database' | 'firestore' | 'storage'

  interface PrecacheOptions {
    schemas?: string[]
  }

  type SetupModule = (context: Context) => FixMe

  interface RegisteredModule {
    moduleName: ModuleName
    setupModule: SetupModule
  }

  interface Factory {
    (config: Config): PublicApi
    _registerModule(moduleName: ModuleName, setupModule: SetupModule): void
    _ensureService(serviceName: FirebaseService, context: Context): FixMe
  }

  interface FactoryCreator {
    (): Factory
  }

  interface PublicApi {
    content: FixMe
    schemas: FixMe
    storage: FixMe
    nav: FixMe
    settings: FixMe
    users: FixMe
  }

  interface Config {
    firebaseApp: FixMe
    env?: string
    locale?: string
    dbType?: 'rtdb' | 'cf'
    precache?: boolean | PrecacheOptions
  }

  interface Context extends Config {
    modules: Modules
    services: FixMe
    cache?: FixMe
    emitter?: EventEmitter.Emitter
    proxySupported: boolean
    usesAdminApp: boolean
    isNodeEnvironment?: boolean
  }

  namespace EventEmitter {
    type Listener = (...args: FixMe[]) => void

    interface Events {
      [event: string]: Listener[]
    }
    interface Emitter {
      on(event: string, listener: Listener): () => void
      off(event: string, listener: Listener): void
      offAll(): void
      emit(event: string, ...args: FixMe[]): void
      once(event: string, listener: Listener): () => void
    }
  }

  namespace PromiseEmitter {
    type ResolveFn = (data?: FixMe) => FixMe
    type RejectFn = (error?: FixMe) => FixMe

    type Callback = (
      resolveFn: ResolveFn,
      rejectFn: RejectFn,
      emitter: EventEmitter.Emitter
    ) => FixMe

    type PromiseState = 'PENDING' | 'FULFILLED' | 'REJECTED'

    interface ChainItem {
      onFulfilled: ResolveFn
      onRejected: RejectFn
    }

    interface PromiseEmitter<T> extends PromiseLike<FixMe>, EventEmitter.Emitter {
      then(resolveFn: ResolveFn, rejectFn?: RejectFn): FixMe
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
      startAt?: StringOrNumber
      endAt?: StringOrNumber | StringOrNumber[] | [number, string]
      equalTo?: StringOrNumber
      [x: string]: FixMe
    }

    interface Options extends OrderByOptions, FilterOptions {
      needsWrap?: boolean
      event?: string
      fields?: string[]
      env?: string
      locale?: string
    }
    interface Snapshot {
      val(): FixMe
      [x: string]: FixMe
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

    type FilterClause = [string, string, FixMe]

    interface FilterOptions {
      filters?: FilterClause[]
    }

    interface LimitOptions {
      startAt?: StringOrNumber | StringOrNumber[]
      startAfter?: StringOrNumber | StringOrNumber[]
      endAt?: StringOrNumber | StringOrNumber[]
      endBefore?: StringOrNumber | StringOrNumber[]
      limit?: number
      [x: string]: FixMe
    }

    interface Options extends OrderByOptions, FilterOptions {
      changeType?: string
      fields?: string[]
      env?: string
      locale?: string
      [x: string]: FixMe
    }

    interface DocumentSnapshot {
      data(): FixMe
      [x: string]: FixMe
    }

    type CollectionSnapshotForEach = (doc: DocumentSnapshot) => void

    interface CollectionSnapshot {
      empty: boolean
      forEach(fn: CollectionSnapshotForEach): void
      [x: string]: FixMe
    }
  }
}

export = App
