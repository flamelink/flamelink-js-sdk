import { FlamelinkFactory, Api } from '@flamelink/sdk-users-types'

const factory: FlamelinkFactory = function(context) {
  const api: Api = {
    get: () => {}
  }

  return api
}

export default factory
