/**
 * This file only exists for UMD support for each of the Flamelink modules.
 * Rollup currently only supports inlining dynamic imports for UMD/AMD one level deep,
 * ie. it does not work referencing the dynamic import within the `@flamelink/sdk-settings`
 * package.
 *
 * Once Rollup supports inlining for nested modules, we can remove this and simply import
 * the module package.
 */

import flamelink from '@flamelink/sdk-app'
import App from '@flamelink/sdk-app-types'

const settings: App.SetupModule = async (context: App.Context) => {
  if (context.dbType === 'rtdb') {
    const getApiForRTDB: any = await import('@flamelink/sdk-settings/dist/rtdb')
    return getApiForRTDB(context)
  }

  const getApiForCF: any = await import('@flamelink/sdk-settings/dist/cf')
  return getApiForCF(context)
}

export default flamelink._registerModule('settings', settings)
