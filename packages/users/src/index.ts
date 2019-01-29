import flamelink from '@flamelink/sdk-app'
import { SetupModule } from '@flamelink/sdk-app'

const users: SetupModule = context => {
  // If any bootstrapping is required, do it here

  return {
    get: () => {}
  }
}

export default flamelink._registerModule('users', users)
