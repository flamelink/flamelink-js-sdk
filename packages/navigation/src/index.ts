import flamelink from '@flamelink/sdk-app'

const navigation = context => {
  // If any bootstrapping is required, do it here

  return {
    get: () => {},
    getItems: () => {},
    subscribe: () => {},
    unsubscribe: () => {},
    set: () => {}, // TODO: Consider replacing with `add`
    update: () => {},
    remove: () => {},
    transaction: () => {},
    ref: () => {}
  }
}

export default flamelink.registerModule('nav', navigation) // TODO: Check if module can be aliased to "navigation" as well
