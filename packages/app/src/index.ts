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

const getModule = (moduleName: ModuleName, context: FlamelinkContext) => {
  return context.modules[moduleName] || context.proxySupported
    ? new Proxy(
        {},
        {
          get(obj, prop) {
            console.log('proxy', obj, prop)
            return () =>
              console.error(
                `Oh no! Looks like you have not imported the "${moduleName}" module.`
              )
          }
        }
      )
    : null
}

export const createFlamelinkFactory: FlamelinkFactoryCreator = () => {
  const context: FlamelinkContext = {
    firebaseApp: null,
    env: 'production',
    locale: 'en-US',
    dbType: 'rtdb',
    modules: {},
    proxySupported: typeof Proxy !== 'undefined'
  }

  function flamelink(config: FlamelinkConfig): FlamelinkPublicApi {
    // Config checks
    console.log(context)

    const api: FlamelinkPublicApi = {
      get content() {
        return getModule('content', context)
      },
      get schemas() {
        return getModule('schemas', context)
      },
      get storage() {
        return getModule('storage', context)
      },
      get nav() {
        return getModule('nav', context)
      },
      get settings() {
        return getModule('settings', context)
      },
      get users() {
        return getModule('users', context)
      }
    }

    return api
  }

  flamelink._registerModule = (
    moduleName: ModuleName,
    setupModule: SetupModule
  ) => {
    if (context.modules[moduleName]) {
      throw new Error('Module already registered') // Create error util with user friendly error message
    }

    Object.defineProperty(context.modules, moduleName, {
      value: setupModule(context),
      writable: false
    })
  }

  return flamelink
}

export default createFlamelinkFactory()
