import { FirebaseApp } from '@firebase/app-types'
import { Context, UnsubscribeMethod } from '@flamelink/sdk-app-types'
import { Api } from '@flamelink/sdk-settings-types'
import uniqueId from 'lodash/uniqueId'
import { factory as getAPI } from '../index'
import {
  initializeRealtimeProject,
  getBaseContext,
} from '../../../../tools/testing/firebase'
import getImageSizes from '../../../../fixtures/image-sizes'
import getGlobals from '../../../../fixtures/globals'

describe('- RTDB Settings', () => {
  let api: Api
  let unsubscribe: UnsubscribeMethod

  beforeEach(async () => {
    const firebaseApp: Partial<FirebaseApp> = await initializeRealtimeProject({
      projectId: uniqueId('project-'),
    })

    const context: Context = getBaseContext({ dbType: 'rtdb', firebaseApp })

    api = getAPI(context)
  })

  afterEach(() => {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }

    api = null
  })

  describe('- "setLocale"', () => {
    test('should resolve with the given locale if called with a supported locale', () => {
      const testLocale = 'af-ZA'
      return expect(api.setLocale(testLocale)).resolves.toBe(testLocale)
    })
  })

  describe('- "getLocale"', () => {
    test('should resolve with the default locale if not provided during init', () => {
      const defaultLocale = 'en'
      return expect(api.getLocale()).resolves.toBe(defaultLocale)
    })

    test('should resolve with the previously explicitly set locale', async () => {
      const testLocale = 'af-ZA'
      await api.setLocale(testLocale)
      return expect(api.getLocale()).resolves.toBe(testLocale)
    })
  })

  describe('- "setEnvironment"', () => {
    test('should resolve with the given environment if called with a supported environment', () => {
      const testEnvironment = 'staging'
      return expect(api.setEnvironment(testEnvironment)).resolves.toBe(
        testEnvironment
      )
    })
  })

  describe('- "getEnvironment"', () => {
    test('should resolve with the default environment if not provided during init', () => {
      const defaultEnvironment = 'production'
      return expect(api.getEnvironment()).resolves.toBe(defaultEnvironment)
    })

    test('should resolve with the previously explicitly set environment', async () => {
      const testEnvironment = 'staging'
      await api.setEnvironment(testEnvironment)
      return expect(api.getEnvironment()).resolves.toBe(testEnvironment)
    })
  })

  describe('> Once-off methods', () => {
    test('should expose a "getImageSizes" method', () => {
      return expect(api.getImageSizes()).resolves.toEqual(getImageSizes())
    })

    test('should expose a "getGlobals" method', () => {
      return expect(api.getGlobals()).resolves.toEqual(getGlobals('rtdb'))
    })

    test('should expose a "getDefaultPermissionsGroup" method', () => {
      // Default Permission Group is 1 for the Super Admin user
      return expect(api.getDefaultPermissionsGroup()).resolves.toEqual(1)
    })
  })

  describe('> Subscribe methods', () => {
    test('should expose a "subscribeImageSizes" method', () =>
      new Promise((resolve, reject) => {
        unsubscribe = api.subscribeImageSizes({
          callback(err, images) {
            if (err) {
              return reject(err)
            }

            expect(images).toEqual(getImageSizes())
            resolve()
          },
        })
      }))

    test('should expose a "subscribeGlobals" method', () =>
      new Promise((resolve, reject) => {
        unsubscribe = api.subscribeGlobals({
          callback(err, globals) {
            if (err) {
              return reject(err)
            }

            expect(globals).toEqual(getGlobals('rtdb'))
            resolve()
          },
        })
      }))

    test('should expose a "subscribeDefaultPermissionsGroup" method', () =>
      new Promise((resolve, reject) => {
        unsubscribe = api.subscribeDefaultPermissionsGroup({
          callback(err, permissionGroup) {
            if (err) {
              return reject(err)
            }

            // Default Permission Group is 1 for the Super Admin user
            expect(permissionGroup).toEqual(1)
            resolve()
          },
        })
      }))
  })
})
