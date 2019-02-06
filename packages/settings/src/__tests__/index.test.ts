import flamelink from '@flamelink/sdk-app'

describe('Settings Module', () => {
  test('should register itself with the Flamelink app', async () => {
    jest.spyOn(flamelink, '_registerModule')

    await import('../index')

    expect(flamelink._registerModule).toHaveBeenCalledWith(
      'settings',
      expect.any(Function)
    )
  })
})
