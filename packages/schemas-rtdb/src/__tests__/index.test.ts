import { FirebaseApp } from '@firebase/app-types'
import { Context, UnsubscribeMethod } from '@flamelink/sdk-app-types'
import { Api, SchemaRtdb } from '@flamelink/sdk-schemas-types'
import get from 'lodash/get'
import uniqueId from 'lodash/uniqueId'
import { factory as getAPI } from '../index'
import { EventEmitter } from '@flamelink/sdk-utils/src'
import {
  initializeRealtimeProject,
  getBaseContext
} from '../../../../tools/testing/firebase'
import { getAllSchemas, getSchema } from '../../../../fixtures/schemas'

describe('- RTDB Schemas', () => {
  let api: Api
  let unsubscribe: UnsubscribeMethod

  beforeEach(async () => {
    const firebaseApp: Partial<FirebaseApp> = await initializeRealtimeProject({
      projectId: uniqueId('project-')
    })

    const context: Context = getBaseContext({
      dbType: 'rtdb',
      firebaseApp,
      emitter: new EventEmitter()
    })

    api = getAPI(context)
  })

  afterEach(() => {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }

    api = null
  })

  describe('- "get"', () => {
    test('should return all schemas if no "schemaKey" is provided', () => {
      return expect(api.get()).resolves.toEqual(
        getAllSchemas({ dbType: 'rtdb' })
      )
    })

    test('should return a specific schema if a "schemaKey" is provided for an existing schema', () => {
      const schemaKey = 'products'
      return expect(api.get({ schemaKey })).resolves.toEqual(
        getSchema({ dbType: 'rtdb', schemaKey })
      )
    })

    test('should return `null` if a "schemaKey" is provided for a non-existing schema', () => {
      const schemaKey = 'this-schema-does-not-exist'
      return expect(api.get({ schemaKey })).resolves.toEqual(null)
    })
  })

  describe('- "getFields"', () => {
    test('should return the fields for all schemas if no "schemaKey" is provided', () => {
      const allSchemas = getAllSchemas({ dbType: 'rtdb' })
      const expected = Object.keys(allSchemas).reduce(
        (acc, schemaKey) =>
          Object.assign(acc, {
            [schemaKey]: get(allSchemas, `${schemaKey}.fields`, [])
          }),
        {}
      )
      return expect(api.getFields({})).resolves.toEqual(expected)
    })

    test(`should return a specific schema's fields if a "schemaKey" is provided for an existing schema`, () => {
      const schemaKey = 'products'
      return expect(api.getFields({ schemaKey })).resolves.toEqual(
        getSchema({ dbType: 'rtdb', schemaKey }).fields
      )
    })

    test('should return `null` if a "schemaKey" is provided for a non-existing schema', () => {
      const schemaKey = 'this-schema-does-not-exist'
      return expect(api.getFields({ schemaKey })).resolves.toEqual(null)
    })
  })

  describe(' - "subscribe"', () => {
    test('should return all schemas if no "schemaKey" is provided', () =>
      new Promise((resolve, reject) => {
        unsubscribe = api.subscribe({
          callback(err, schemas) {
            if (err) {
              return reject(err)
            }

            expect(schemas).toEqual(getAllSchemas({ dbType: 'rtdb' }))
            resolve()
          }
        })
      }))

    test('should return a specific schema if a "schemaKey" is provided for an existing schema', () =>
      new Promise((resolve, reject) => {
        const schemaKey = 'products'
        unsubscribe = api.subscribe({
          schemaKey,
          callback(err, schemas) {
            if (err) {
              return reject(err)
            }

            expect(schemas).toEqual(getSchema({ dbType: 'rtdb', schemaKey }))
            resolve()
          }
        })
      }))

    test('should return `null` if a "schemaKey" is provided for a non-existing schema', () =>
      new Promise((resolve, reject) => {
        const schemaKey = 'this-schema-key-does-not-exist'
        unsubscribe = api.subscribe({
          schemaKey,
          callback(err, schemas) {
            if (err) {
              return reject(err)
            }

            expect(schemas).toEqual(null)
            resolve()
          }
        })
      }))
  })

  describe(' - "subscribeFields"', () => {
    test('should return all schemas if no "schemaKey" is provided', () =>
      new Promise((resolve, reject) => {
        const allSchemas = getAllSchemas({ dbType: 'rtdb' })
        const expected = Object.keys(allSchemas).reduce(
          (acc, schemaKey) =>
            Object.assign(acc, {
              [schemaKey]: get(allSchemas, `${schemaKey}.fields`, [])
            }),
          {}
        )
        unsubscribe = api.subscribeFields({
          callback(err, schemas) {
            if (err) {
              return reject(err)
            }

            expect(schemas).toEqual(expected)
            resolve()
          }
        })
      }))

    test('should return a specific schema if a "schemaKey" is provided for an existing schema', () =>
      new Promise((resolve, reject) => {
        const schemaKey = 'products'
        unsubscribe = api.subscribeFields({
          schemaKey,
          callback(err, schemas) {
            if (err) {
              return reject(err)
            }

            expect(schemas).toEqual(
              getSchema({ dbType: 'rtdb', schemaKey }).fields
            )
            resolve()
          }
        })
      }))

    test('should return `null` if a "schemaKey" is provided for a non-existing schema', () =>
      new Promise((resolve, reject) => {
        const schemaKey = 'this-schema-key-does-not-exist'
        unsubscribe = api.subscribeFields({
          schemaKey,
          callback(err, schemas) {
            if (err) {
              return reject(err)
            }

            expect(schemas).toEqual(null)
            resolve()
          }
        })
      }))
  })

  describe('- "add"', () => {
    test('should throw an error if no "schemaKey" is provided', () => {
      return expect(
        api.add({ schemaKey: undefined, data: {} })
      ).rejects.toThrowError()
    })

    test('should throw an error if no "data" object is provided', () => {
      return expect(
        api.add({ schemaKey: 'something', data: undefined })
      ).rejects.toThrow()
    })

    test('should successfully add a new schema with fields provided', async () => {
      const schemaKey = 'posts'
      const data: Partial<SchemaRtdb> = {
        title: 'Posts',
        description: 'Test posts schema',
        enabled: false,
        type: 'collection'
      }
      const expected = {
        __meta__: {
          createdBy: expect.any(String),
          createdDate: expect.any(String)
        },
        description: 'Test posts schema',
        enabled: false,
        group: '',
        icon: '',
        id: 'posts',
        sortable: true,
        title: 'Posts',
        type: 'collection'
      }

      await api.add({ schemaKey, data })

      return expect(api.get({ schemaKey })).resolves.toEqual(
        expect.objectContaining(expected)
      )
    })
  })

  describe('- "update"', () => {
    test('should throw an error if no "schemaKey" is provided', () => {
      return expect(
        api.update({ schemaKey: undefined, data: {} })
      ).rejects.toThrowError()
    })

    test('should throw an error if no "data" object is provided', () => {
      return expect(
        api.update({ schemaKey: 'something', data: undefined })
      ).rejects.toThrowError()
    })

    test('should successfully update an existing schema with fields provided', async () => {
      const schemaKey = 'products'
      const data = {
        description: 'Updated description',
        enabled: false
      }
      const expected = {
        ...getSchema({ dbType: 'rtdb', schemaKey }),
        ...{
          __meta__: {
            lastModifiedBy: expect.any(String),
            lastModifiedDate: expect.any(String)
          },
          description: 'Updated description',
          enabled: false
        }
      }

      await api.update({ schemaKey, data })

      return expect(api.get({ schemaKey })).resolves.toEqual(
        expect.objectContaining(expected)
      )
    })
  })

  describe('- "remove"', () => {
    test('should throw an error if no "schemaKey" is provided', () => {
      return expect(() => api.remove({ schemaKey: undefined })).toThrowError()
    })

    test('should successfully remove an existing schema', async () => {
      const schemaKey = 'productCategory'

      const before = await api.get({ schemaKey })
      expect(before).toEqual(getSchema({ dbType: 'rtdb', schemaKey }))

      await api.remove({ schemaKey })

      return expect(api.get({ schemaKey })).resolves.toEqual(null)
    })
  })
})
