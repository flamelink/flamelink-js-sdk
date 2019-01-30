import flamelink from '@flamelink/sdk-app'
import { SetupModule } from '@flamelink/sdk-app-types'

const settings: SetupModule = async function(context) {
  if (context.dbType === 'rtdb') {
    const getApiForRTDB: any = await import('./rtdb')
    return getApiForRTDB(context)
  }

  const getApiForCF: any = await import('./cf')
  return getApiForCF(context)
}

export default flamelink._registerModule('settings', settings)
