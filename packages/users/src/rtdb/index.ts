import { FlamelinkUsersFactory } from '@flamelink/sdk-users-types'

const factory: FlamelinkUsersFactory = context => {
  console.log('users from rtdb', context)

  return {
    get: () => {}
  }
}

export default factory
