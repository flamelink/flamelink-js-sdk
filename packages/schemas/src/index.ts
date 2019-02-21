import flamelink from '@flamelink/sdk-app'
import { SetupModule } from '@flamelink/sdk-app-types'
import { getDefaultImport } from '@flamelink/sdk-utils'

const schemas: SetupModule = function(context) {
  switch (context.dbType) {
    case 'rtdb':
      return getDefaultImport(require('./rtdb'))(context)

    case 'cf':
      return getDefaultImport(require('./cf'))(context)

    default:
      throw new Error('[FLAMELINK] No valid database type was provided')
  }
}

flamelink._registerModule('schemas', schemas)
