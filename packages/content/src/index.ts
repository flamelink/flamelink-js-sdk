import flamelink from '@flamelink/sdk-app'
import { SetupModule } from '@flamelink/sdk-app-types'
import '@flamelink/sdk-schemas'

const content: SetupModule = async function(context) {
  if (context.dbType === 'rtdb') {
    const fn: any = await import('./rtdb')
    return fn(context)
  }

  const fn: any = await import('./cf')
  return fn(context)
}

export default flamelink._registerModule('content', content)
