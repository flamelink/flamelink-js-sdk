import flamelink from '@flamelink/sdk-app'
import { SetupModule } from '@flamelink/sdk-app'

const schemas: SetupModule = context => {
  // If any bootstrapping is required, do it here

  return {
    get: () => {},
    getFields: () => {},
    subscribe: () => {},
    unsubscribe: () => {},
    set: () => {}, // TODO: Consider replacing with `add`
    update: () => {},
    remove: () => {},
    transaction: () => {},
    ref: () => {}
  }
}

export default flamelink._registerModule('schemas', schemas)
