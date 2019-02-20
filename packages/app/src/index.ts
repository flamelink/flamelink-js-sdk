// TODO: Move the necessary types to the `@flamelink/sdk-app-types/private.d.ts` file
import {
  ModuleName,
  FirebaseService,
  FlamelinkContext,
  FlamelinkFactoryCreator,
  FlamelinkConfig,
  FlamelinkPublicApi,
  SetupModule,
  RegisteredModule
} from '@flamelink/sdk-app-types'
import { logWarning, logError } from '@flamelink/sdk-utils'
import {
  getModule,
  ensureValidContext,
  isAdminApp,
  isNodeEnvironment
} from './helpers'
import {
  PUBLIC_MODULES,
  DEFAULT_ENVIRONMENT,
  DEFAULT_LOCALE,
  DEFAULT_DB_TYPE
} from './constants'

const createFlamelinkFactory: FlamelinkFactoryCreator = () => {
  const registeredModules: RegisteredModule[] = []

  const initRegisteredModules = (context: FlamelinkContext): void => {
    registeredModules.forEach(({ moduleName, setupModule }) => {
      if (context.modules[moduleName]) {
        return logWarning(`Duplicate imports for the "${moduleName}" module`)
      }

      Object.defineProperty(context.modules, moduleName, {
        value: setupModule(context),
        writable: false
      })
    })
  }

  function flamelink(config: FlamelinkConfig): FlamelinkPublicApi {
    const context: FlamelinkContext = {
      firebaseApp: config.firebaseApp,
      env: config.env || DEFAULT_ENVIRONMENT,
      locale: config.locale || DEFAULT_LOCALE,
      dbType: config.dbType || DEFAULT_DB_TYPE,
      modules: {},
      services: {},
      cache: {},
      precache: typeof config.precache === 'undefined' ? true : config.precache,
      proxySupported: typeof Proxy !== 'undefined',
      usesAdminApp: isAdminApp(config.firebaseApp),
      isNodeEnvironment: isNodeEnvironment()
    }

    ensureValidContext(context)

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

  flamelink._ensureService = (
    serviceName: FirebaseService,
    context: FlamelinkContext
  ) => {
    if (context.services[serviceName]) {
      return context.services[serviceName]
    }

    try {
      context.services[serviceName] = context.firebaseApp[serviceName]()
    } catch (error) {
      logError(
        `The "${serviceName}" Firebase service could not be instantiated. Please ensure you have imported the package for this service.`
      )
      throw error
    }

    return context.services[serviceName]
  }

  return flamelink
}

export default createFlamelinkFactory()
