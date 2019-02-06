import { ModuleName, FlamelinkContext } from '@flamelink/sdk-app-types'
import { logError } from '@flamelink/sdk-utils'

export const getModule = (
  moduleName: ModuleName,
  context: FlamelinkContext
) => {
  if (context.modules[moduleName]) {
    return context.modules[moduleName]
  }

  return context.proxySupported
    ? new Proxy(
        {},
        {
          get(obj, prop) {
            return () =>
              logError(
                `Oh no! Looks like you have not imported the "${moduleName}" module.`
              )
          }
        }
      )
    : null
}
