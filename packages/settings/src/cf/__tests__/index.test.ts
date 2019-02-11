import getAPI from '../index'

const baseContext = {
  env: 'production',
  locale: 'en-US',
  modules: {},
  services: {},
  proxySupported: false,
  usesAdminApp: false,
  firebaseApp: {}
  // dbType: 'cf'
}

describe('- CF', () => {
  describe('- "setLocale"', () => {
    test('should resolve with the given locale if called with a supported locale', () => {
      expect.assertions(1)
      const testLocale = 'af-ZA'

      return expect(
        getAPI({ ...baseContext }).setLocale(testLocale)
      ).resolves.toBe(testLocale)
    })
  })

  describe('- "getLocale"', () => {
    test('should resolve with the default locale if not provided during init', () => {
      expect.assertions(1)
      const defaultLocale = 'en-US'
      return expect(getAPI({ ...baseContext }).getLocale()).resolves.toBe(
        defaultLocale
      )
    })

    test('should resolve with the previously explicitly set locale', async () => {
      expect.assertions(1)

      const testLocale = 'af-ZA'
      const api = getAPI({ ...baseContext })
      await api.setLocale(testLocale)

      return expect(api.getLocale()).resolves.toBe(testLocale)
    })
  })

  describe('- "setEnvironment"', () => {
    test('should resolve with the given environment if called with a supported environment', () => {
      expect.assertions(1)
      const testEnvironment = 'staging'

      return expect(
        getAPI({ ...baseContext }).setEnvironment(testEnvironment)
      ).resolves.toBe(testEnvironment)
    })
  })

  describe('- "getEnvironment"', () => {
    test('should resolve with the default environment if not provided during init', () => {
      expect.assertions(1)
      const defaultEnvironment = 'production'
      return expect(getAPI({ ...baseContext }).getEnvironment()).resolves.toBe(
        defaultEnvironment
      )
    })

    test('should resolve with the previously explicitly set environment', async () => {
      expect.assertions(1)

      const testEnvironment = 'staging'
      const api = getAPI({ ...baseContext })
      await api.setEnvironment(testEnvironment)

      return expect(api.getEnvironment()).resolves.toBe(testEnvironment)
    })
  })
})
