const getModule = (moduleName, context) => {
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

const createFlamelinkFactory = () => {
  const context = {
    env: 'production',
    locale: 'en-US',
    modules: {},
    proxySupported: typeof Proxy !== 'undefined'
  }

  function flamelink(config) {
    // Config checks
    console.log(context)

    const api = {
      get settings() {
        return getModule('settings', context)
      }
    }

    return api
  }

  flamelink._registerModule = (moduleName, setupModule) => {
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
