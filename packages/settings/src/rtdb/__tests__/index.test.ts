import getAPI from '../index'
import { initializeRealtimeProject } from '../../../../../tools/testing/firebase'
import getImageSizes from '../../../../../fixtures/image-sizes'
import getGlobals from '../../../../../fixtures/globals'
import { resolve } from 'uri-js'

const baseContext = {
  env: 'production',
  locale: 'en-US',
  modules: {},
  services: {},
  proxySupported: false,
  usesAdminApp: false,
  firebaseApp: {}
  // dbType: 'rtdb' // TODO: Figure out why Type checking fails when enabled
}

let firebaseApp: any
let databaseName: string

describe('- RTDB', () => {
  afterAll(() => {
    firebaseApp = null
    databaseName = null
  })

  describe('- "setLocale"', () => {
    test('should resolve with the given locale if called with a supported locale', () => {
      expect.assertions(1)
      const testLocale = 'af-ZA'
      return expect(
        getAPI({ ...baseContext, dbType: 'rtdb' }).setLocale(testLocale)
      ).resolves.toBe(testLocale)
    })
  })

  describe('- "getLocale"', () => {
    test('should resolve with the default locale if not provided during init', () => {
      expect.assertions(1)
      const defaultLocale = 'en-US'
      return expect(
        getAPI({ ...baseContext, dbType: 'rtdb' }).getLocale()
      ).resolves.toBe(defaultLocale)
    })

    test('should resolve with the previously explicitly set locale', async () => {
      expect.assertions(1)
      const testLocale = 'af-ZA'
      const api = getAPI({ ...baseContext, dbType: 'rtdb' })
      await api.setLocale(testLocale)
      return expect(api.getLocale()).resolves.toBe(testLocale)
    })
  })

  describe('- "setEnvironment"', () => {
    test('should resolve with the given environment if called with a supported environment', () => {
      expect.assertions(1)
      const testEnvironment = 'staging'
      return expect(
        getAPI({ ...baseContext, dbType: 'rtdb' }).setEnvironment(
          testEnvironment
        )
      ).resolves.toBe(testEnvironment)
    })
  })

  describe('- "getEnvironment"', () => {
    test('should resolve with the default environment if not provided during init', () => {
      expect.assertions(1)
      const defaultEnvironment = 'production'
      return expect(
        getAPI({ ...baseContext, dbType: 'rtdb' }).getEnvironment()
      ).resolves.toBe(defaultEnvironment)
    })

    test('should resolve with the previously explicitly set environment', async () => {
      expect.assertions(1)
      const testEnvironment = 'staging'
      const api = getAPI({ ...baseContext, dbType: 'rtdb' })
      await api.setEnvironment(testEnvironment)
      return expect(api.getEnvironment()).resolves.toBe(testEnvironment)
    })
  })

  describe('> Once-off methods', () => {
    beforeEach(async () => {
      databaseName = Date.now().toString()

      firebaseApp = await initializeRealtimeProject({
        databaseName
      })
    })

    test('should expose a "getImageSizes" method', () => {
      expect.assertions(1)
      const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
      return expect(api.getImageSizes()).resolves.toEqual(getImageSizes())
    })

    test('should expose a "getGlobals" method', () => {
      expect.assertions(1)
      const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
      return expect(api.getGlobals()).resolves.toEqual(getGlobals())
    })

    test('should expose a "getDefaultPermissionsGroup" method', () => {
      expect.assertions(1)
      const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
      // Default Permission Group is 1 for the Super Admin user
      return expect(api.getDefaultPermissionsGroup()).resolves.toEqual(1)
    })
  })

  describe('> Subscribe methods', () => {
    let unsubscribe: any

    beforeEach(async () => {
      databaseName = Date.now().toString()

      firebaseApp = await initializeRealtimeProject({
        databaseName
      })
    })

    afterEach(() => {
      if (unsubscribe) {
        unsubscribe()
        unsubscribe = null
      }
    })

    test('should expose a "subscribeImageSizes" method', () =>
      new Promise((resolve, reject) => {
        expect.assertions(1)
        const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
        unsubscribe = api.subscribeImageSizes({
          callback(err, images) {
            if (err) {
              return reject(err)
            }

            expect(images).toEqual(getImageSizes())
            resolve()
          }
        })
      }))

    test('should expose a "subscribeGlobals" method', () =>
      new Promise((resolve, reject) => {
        expect.assertions(1)
        const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
        unsubscribe = api.subscribeGlobals({
          callback(err, globals) {
            if (err) {
              return reject(err)
            }

            expect(globals).toEqual(getGlobals())
            resolve()
          }
        })
      }))

    test('should expose a "subscribeDefaultPermissionsGroup" method', () =>
      new Promise((resolve, reject) => {
        expect.assertions(1)
        const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
        unsubscribe = api.subscribeDefaultPermissionsGroup({
          callback(err, permissionGroup) {
            if (err) {
              return reject(err)
            }

            // Default Permission Group is 1 for the Super Admin user
            expect(permissionGroup).toEqual(1)
            resolve()
          }
        })
      }))
  })
})
