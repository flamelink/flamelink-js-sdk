import flamelink from '@flamelink/sdk-app'

const content = context => {
  // If any bootstrapping is required, do it here

  return {
    get: () => {},
    getByField: () => {},
    subscribe: () => {},
    unsubscribe: () => {},
    set: () => {}, // TODO: Consider replacing with `add`
    update: () => {},
    remove: () => {},
    transaction: () => {},
    ref: () => {}
  }
}

export default flamelink.registerModule('content', content)
