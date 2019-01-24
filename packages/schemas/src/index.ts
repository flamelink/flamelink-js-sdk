import flamelink from '@flamelink/sdk-app'

const schemas = context => {
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

export default flamelink.registerModule('schemas', schemas)
