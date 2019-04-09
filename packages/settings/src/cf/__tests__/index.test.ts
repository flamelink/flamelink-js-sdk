import uniqueId from 'lodash/uniqueId'
import getAPI from '../index'
import { initializeFirestoreProject } from '../../../../../tools/testing/firebase'
import getImageSizes from '../../../../../fixtures/image-sizes'
import getGlobals from '../../../../../fixtures/globals'

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

let firebaseApp: any
let projectId: string

describe('- CF', () => {
  afterAll(() => {
    firebaseApp = null
  })

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

  describe('> Once-off methods', () => {
    beforeEach(async () => {
      projectId = uniqueId('project-')

      firebaseApp = await initializeFirestoreProject({
        projectId,
        auth: null // { uid: 'alice', email: 'alice@example.com' }
      })
    })

    test('should expose a "getImageSizes" method', () => {
      expect.assertions(1)
      const api = getAPI({ ...baseContext, dbType: 'cf', firebaseApp })
      return expect(api.getImageSizes()).resolves.toEqual(getImageSizes())
    })

    test('should expose a "getGlobals" method', () => {
      expect.assertions(1)
      const api = getAPI({ ...baseContext, dbType: 'cf', firebaseApp })
      return expect(api.getGlobals()).resolves.toEqual(getGlobals('cf'))
    })

    test('should expose a "getDefaultPermissionsGroup" method', async () => {
      expect.assertions(1)
      const api = getAPI({ ...baseContext, dbType: 'cf', firebaseApp })
      // Default Permission Group is 1 for the Super Admin user
      const defaultPerms = await api.getDefaultPermissionsGroup()
      return expect(defaultPerms.path).toEqual(`fl_permissions/1`)
    })
  })

  describe('> Subscribe methods', () => {
    let unsubscribe: any

    beforeEach(async () => {
      projectId = uniqueId('project-')

      firebaseApp = await initializeFirestoreProject({
        projectId,
        auth: null // { uid: 'alice', email: 'alice@example.com' }
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
        const api = getAPI({ ...baseContext, dbType: 'cf', firebaseApp })
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
        const api = getAPI({ ...baseContext, dbType: 'cf', firebaseApp })
        unsubscribe = api.subscribeGlobals({
          callback(err, globals) {
            if (err) {
              return reject(err)
            }

            expect(globals).toEqual(getGlobals('cf'))
            resolve()
          }
        })
      }))

    test('should expose a "subscribeDefaultPermissionsGroup" method', () =>
      new Promise((resolve, reject) => {
        expect.assertions(1)
        const api = getAPI({ ...baseContext, dbType: 'cf', firebaseApp })
        unsubscribe = api.subscribeDefaultPermissionsGroup({
          callback(err, permissionGroup) {
            if (err) {
              return reject(err)
            }

            // Default Permission Group is 1 for the Super Admin user
            expect(permissionGroup.path).toEqual('fl_permissions/1')
            resolve()
          }
        })
      }))
  })
})
