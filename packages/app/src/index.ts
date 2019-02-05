// TODO: Move the necessary types to the `@flamelink/sdk-app-types/private.d.ts` file
import {
  ModuleName,
  FlamelinkContext,
  FlamelinkFactoryCreator,
  FlamelinkConfig,
  FlamelinkPublicApi,
  SetupModule,
  RegisteredModule
} from '@flamelink/sdk-app-types'

const PUBLIC_MODULES: ModuleName[] = [
  'content',
  'schemas',
  'storage',
  'nav',
  'settings',
  'users'
]

const getModule = (moduleName: ModuleName, context: FlamelinkContext) => {
  if (context.modules[moduleName]) {
    return context.modules[moduleName]
  }

  return context.proxySupported
    ? new Proxy(
        {},
        {
          get(obj, prop) {
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
  const registeredModules: RegisteredModule[] = []

  const initRegisteredModules = (context: FlamelinkContext): void => {
    registeredModules.forEach(({ moduleName, setupModule }) => {
      if (context.modules[moduleName]) {
        return console.warn(
          `[FLAMELINK]: Duplicate imports for the "${moduleName}" module`
        )
      }

      Object.defineProperty(context.modules, moduleName, {
        value: setupModule(context),
        writable: false
      })
    })
  }

  function flamelink(config: FlamelinkConfig): FlamelinkPublicApi {
    const context: FlamelinkContext = {
      firebaseApp: null,
      env: 'production',
      locale: 'en-US',
      dbType: 'rtdb',
      modules: {},
      proxySupported: typeof Proxy !== 'undefined'
    }

    Object.assign(context, config)

    initRegisteredModules(context)

    const api: FlamelinkPublicApi = PUBLIC_MODULES.reduce(
      (acc: any, moduleName) => {
        return Object.assign(acc, {
          get [moduleName]() {
            return getModule(moduleName, context)
          }
        })
      },
      {}
    )

    return api
  }

  flamelink._registerModule = (
    moduleName: ModuleName,
    setupModule: SetupModule
  ) => {
    registeredModules.push({
      moduleName,
      setupModule
    })
  }

  return flamelink
}

export default createFlamelinkFactory()
