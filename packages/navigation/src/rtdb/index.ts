import { FlamelinkNavigationFactory } from '@flamelink/sdk-navigation-types'

const factory: FlamelinkNavigationFactory = context => {
  console.log('nav from rtdb', context)

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

export default factory
