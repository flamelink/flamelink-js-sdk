import app from '@flamelink/sdk-app'

describe('Users Module', () => {
  beforeAll(() => {
    jest.spyOn(app, '_registerModule')
  })

  test('should register itself with the Flamelink app', async () => {
    await import('../')
    expect(app._registerModule).toHaveBeenCalledWith(
      'users',
      expect.any(Function)
    )
  })
})
