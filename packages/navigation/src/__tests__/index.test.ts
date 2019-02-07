import app from '@flamelink/sdk-app'

describe('Navigation Module', () => {
  beforeAll(() => {
    jest.spyOn(app, '_registerModule')
  })

  test('should register itself with the Flamelink app', async () => {
    await import('../')
    expect(app._registerModule).toHaveBeenCalledWith(
      'nav',
      expect.any(Function)
    )
  })
})
