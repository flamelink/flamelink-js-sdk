import flamelink from '@flamelink/sdk-app'
import { SetupModule } from '@flamelink/sdk-app-types'

const navigation: SetupModule = async function(context) {
  if (context.dbType === 'rtdb') {
    const fn: any = await import('./rtdb')
    return fn(context)
  }

  const fn: any = await import('./cf')
  return fn(context)
}

export default flamelink._registerModule('nav', navigation) // TODO: Check if module can be aliased to "navigation" as well
