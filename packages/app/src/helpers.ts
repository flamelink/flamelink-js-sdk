import { ModuleName, FlamelinkContext } from '@flamelink/sdk-app-types'
import { logError } from '@flamelink/sdk-utils'
import get from 'lodash/get'

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

/**
 * @description Validate whether the context (including the passed in configuration options)
 * is valid. The method will throw errors if it is not valid.
 * @param context Current Flamelink app context
 * @returns {Void}
 */
export const ensureValidContext = (context: FlamelinkContext) => {
  if (!context.firebaseApp) {
    throw new Error(
      '[FLAMELINK]: Please provide a "firebaseApp" Firebase app instance when initializing your Flamelink app'
    )
  }
}

/**
 * @description Determine if the provided Firebase app instance is one of the Admin
 * SDK app instances or one of the client SDK ones.
 * @param firebaseApp A Firebase app instance - either an admin or client one
 * @returns {Boolean} True if the app instance is one of the firebase-admin SDK ones
 */
export const isAdminApp = (firebaseApp: any): boolean => {
  return (
    !!get(firebaseApp, 'options.credential') &&
    !get(firebaseApp, 'options.apiKey')
  )
}