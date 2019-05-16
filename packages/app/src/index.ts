import * as App from '@flamelink/sdk-app-types'
import { logWarning, logError, EventEmitter } from '@flamelink/sdk-utils'
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

const createFlamelinkFactory: App.FactoryCreator = () => {
  const registeredModules: App.RegisteredModule[] = []

  const initRegisteredModules = (context: App.Context): void => {
    registeredModules.forEach(({ moduleName, setupModule }) => {
      if (context.modules[moduleName]) {
        return logWarning(`Duplicate import for the "${moduleName}" module`)
      }

      Object.defineProperty(context.modules, moduleName, {
        value: setupModule(context),
        writable: false
      })
    })
  }

  function flamelink(config: App.Config): App.PublicApi {
    const context: App.Context = {
      firebaseApp: config.firebaseApp,
      env: config.env || DEFAULT_ENVIRONMENT,
      locale: config.locale || DEFAULT_LOCALE,
      dbType: config.dbType || DEFAULT_DB_TYPE,
      modules: {},
      services: {},
      cache: {},
      emitter: new EventEmitter(),
      precache: typeof config.precache === 'undefined' ? true : config.precache,
      proxySupported: typeof Proxy !== 'undefined',
      usesAdminApp: isAdminApp(config.firebaseApp),
      isNodeEnvironment: isNodeEnvironment()
    }

    ensureValidContext(context)

    initRegisteredModules(context)

    const api: App.PublicApi = PUBLIC_MODULES.reduce((acc: any, moduleName) => {
      return Object.assign(acc, {
        get [moduleName]() {
          return getModule(moduleName, context)
        }
      })
    }, {})

    return api
  }

  flamelink._registerModule = (
    moduleName: App.ModuleName,
    setupModule: App.SetupModule
  ) => {
    registeredModules.push({
      moduleName,
      setupModule
    })
  }

  flamelink._ensureService = (
    serviceName: App.FirebaseService,
    context: App.Context
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
