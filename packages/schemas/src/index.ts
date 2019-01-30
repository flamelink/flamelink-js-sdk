import flamelink from '@flamelink/sdk-app'
import { SetupModule } from '@flamelink/sdk-app-types'

const schemas: SetupModule = async function(context) {
  if (context.dbType === 'rtdb') {
    const fn: any = await import('./rtdb')
    return fn(context)
  }

  const fn: any = await import('./cf')
  return fn(context)
}

export default flamelink._registerModule('schemas', schemas)
