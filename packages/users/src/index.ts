import flamelink from '@flamelink/sdk-app'

const users = context => {
  // If any bootstrapping is required, do it here

  return {
    get: () => {}
  }
}

export default flamelink._registerModule('users', users)
