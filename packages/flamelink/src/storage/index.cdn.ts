/**
 * This file only exists for UMD support for each of the Flamelink modules.
 * Rollup currently only supports inlining dynamic imports for UMD/AMD one level deep,
 * ie. it does not work referencing the dynamic import within the `@flamelink/sdk-storage`
 * package.
 *
 * Once Rollup supports inlining for nested modules, we can remove this and simply import
 * the module package.
 */

import flamelink from '@flamelink/sdk-app'
import { SetupModule, FlamelinkContext } from '@flamelink/sdk-app-types'

const storage: SetupModule = async (context: FlamelinkContext) => {
  if (context.dbType === 'rtdb') {
    const fn: any = await import('@flamelink/sdk-storage/dist/rtdb')
    return fn(context)
  }

  const fn: any = await import('@flamelink/sdk-storage/dist/cf')
  return fn(context)
}

export default flamelink._registerModule('storage', storage)
