import flamelink from '@flamelink/sdk-app'
import App from '@flamelink/sdk-app-types'
import { getDefaultImport } from '@flamelink/sdk-utils'

const navigation: App.SetupModule = function(context) {
  switch (context.dbType) {
    case 'rtdb':
      return getDefaultImport(require('./rtdb'))(context)

    case 'cf':
      return getDefaultImport(require('./cf'))(context)

    default:
      throw new Error('[FLAMELINK] No valid database type was provided')
  }
}

flamelink._registerModule('nav', navigation) // TODO: Check if module can be aliased to "navigation" as well
