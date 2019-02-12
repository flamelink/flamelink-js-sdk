import * as helpers from '../helpers'

describe('App Helpers', () => {
  describe('- getModule', () => {
    test('should show an error if module is not registered yet', () => {
      jest.spyOn(console, 'error')
      const contentModule = helpers.getModule('content', {
        modules: {},
        services: {},
        proxySupported: true,
        usesAdminApp: true,
        firebaseApp: null
      })
      contentModule.get()
      expect(console.error).toHaveBeenCalledWith(
        '[FLAMELINK] Oh no! Looks like you have not imported the "content" module.'
      )
    })
  })
})
