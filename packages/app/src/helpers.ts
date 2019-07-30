import * as App from '@flamelink/sdk-app-types'
import { logError } from '@flamelink/sdk-utils'
import get from 'lodash/get'

export const getModule = (moduleName: App.ModuleName, context: App.Context) => {
  if (context.modules[moduleName]) {
    return context.modules[moduleName]
  }

  return context.proxySupported
    ? new Proxy(
        {},
        {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
export const ensureValidContext = (context: App.Context) => {
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

/**
 * @description Determine if the SDK is running on a Node.js environment or in a browser
 * @returns {Boolean} True if the running in Node.js environment
 */
export const isNodeEnvironment = (): boolean => {
  let isNode = false

  try {
    // Only Node.JS has a process variable that is of [[Class]] process
    isNode =
      Object.prototype.toString.call(global.process) === '[object process]'
  } catch (e) {
    // noop
  }

  return isNode
}
