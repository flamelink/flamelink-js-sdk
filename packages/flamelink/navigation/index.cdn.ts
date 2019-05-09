/**
 * This file only exists for UMD support for each of the Flamelink modules.
 * Rollup currently only supports inlining dynamic imports for UMD/AMD one level deep,
 * ie. it does not work referencing the dynamic import within the `@flamelink/sdk-navigation`
 * package.
 *
 * Once Rollup supports inlining for nested modules, we can remove this and simply import
 * the module package.
 */

import flamelink from '@flamelink/sdk-app'
import * as App from '@flamelink/sdk-app-types'

import getApiForRTDB from '@flamelink/sdk-navigation/dist/rtdb'
import getApiForCF from '@flamelink/sdk-navigation/dist/cf'

const navigation: App.SetupModule = (context: App.Context) => {
  if (context.dbType === 'rtdb') {
    return getApiForRTDB(context)
  }

  return getApiForCF(context)
}

flamelink._registerModule('nav', navigation)
