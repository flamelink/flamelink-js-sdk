import get from 'lodash/get'
import uniqueId from 'lodash/uniqueId'
import getAPI from '../index'
import { EventEmitter } from '../../../../app/src/event-emitter'
import { initializeRealtimeProject } from '../../../../../tools/testing/firebase'
import { getAllSchemas, getSchema } from '../../../../../fixtures/schemas'

const baseContext = {
  env: 'production',
  locale: 'en-US',
  modules: {},
  services: {},
  proxySupported: false,
  usesAdminApp: false,
  firebaseApp: {},
  emitter: new EventEmitter()
  // dbType: 'rtdb' // TODO: Figure out why Type checking fails when enabled
}

let firebaseApp: any
let projectId: string
let unsubscribe: any

describe('- RTDB', () => {
  beforeEach(async () => {
    projectId = uniqueId('project-')

    firebaseApp = await initializeRealtimeProject({
      projectId
    })
  })

  afterEach(() => {
    if (unsubscribe) {
      unsubscribe()
    }

    unsubscribe = null
    firebaseApp = null
    projectId = null
  })

  describe('- "get"', () => {
    test('should return all schemas if no "schemaKey" is provided', () => {
      expect.assertions(1)
      const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
      return expect(api.get()).resolves.toEqual(getAllSchemas())
    })

    test('should return a specific schema if a "schemaKey" is provided for an existing schema', () => {
      expect.assertions(1)
      const schemaKey = 'products'
      const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
      return expect(api.get({ schemaKey })).resolves.toEqual(
        getSchema(schemaKey)
      )
    })

    test('should return `null` if a "schemaKey" is provided for a non-existing schema', () => {
      expect.assertions(1)
      const schemaKey = 'this-schema-does-not-exist'
      const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
      return expect(api.get({ schemaKey })).resolves.toEqual(null)
    })
  })

  describe('- "getFields"', () => {
    test('should return the fields for all schemas if no "schemaKey" is provided', () => {
      expect.assertions(1)
      const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
      const allSchemas = getAllSchemas()
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
      expect.assertions(1)
      const schemaKey = 'products'
      const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
      return expect(api.getFields({ schemaKey })).resolves.toEqual(
        getSchema(schemaKey).fields
      )
    })

    test('should return `null` if a "schemaKey" is provided for a non-existing schema', () => {
      expect.assertions(1)
      const schemaKey = 'this-schema-does-not-exist'
      const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
      return expect(api.getFields({ schemaKey })).resolves.toEqual(null)
    })
  })

  describe(' - "subscribe"', () => {
    test('should return all schemas if no "schemaKey" is provided', () =>
      new Promise((resolve, reject) => {
        expect.assertions(1)
        const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
        unsubscribe = api.subscribe({
          callback(err, schemas) {
            if (err) {
              return reject(err)
            }

            expect(schemas).toEqual(getAllSchemas())
            resolve()
          }
        })
      }))

    test('should return a specific schema if a "schemaKey" is provided for an existing schema', () =>
      new Promise((resolve, reject) => {
        expect.assertions(1)
        const schemaKey = 'products'
        const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
        unsubscribe = api.subscribe({
          schemaKey,
          callback(err, schemas) {
            if (err) {
              return reject(err)
            }

            expect(schemas).toEqual(getSchema(schemaKey))
            resolve()
          }
        })
      }))

    test('should return `null` if a "schemaKey" is provided for a non-existing schema', () =>
      new Promise((resolve, reject) => {
        expect.assertions(1)
        const schemaKey = 'this-schema-key-does-not-exist'
        const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
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
        expect.assertions(1)
        const allSchemas = getAllSchemas()
        const expected = Object.keys(allSchemas).reduce(
          (acc, schemaKey) =>
            Object.assign(acc, {
              [schemaKey]: get(allSchemas, `${schemaKey}.fields`, [])
            }),
          {}
        )
        const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
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
        expect.assertions(1)
        const schemaKey = 'products'
        const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
        unsubscribe = api.subscribeFields({
          schemaKey,
          callback(err, schemas) {
            if (err) {
              return reject(err)
            }

            expect(schemas).toEqual(getSchema(schemaKey).fields)
            resolve()
          }
        })
      }))

    test('should return `null` if a "schemaKey" is provided for a non-existing schema', () =>
      new Promise((resolve, reject) => {
        expect.assertions(1)
        const schemaKey = 'this-schema-key-does-not-exist'
        const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
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
      expect.assertions(1)
      const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
      return expect(() =>
        api.add({ schemaKey: undefined, data: {} })
      ).toThrowError()
    })

    test('should throw an error if no "data" object is provided', () => {
      expect.assertions(1)
      const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
      return expect(() =>
        api.add({ schemaKey: 'something', data: undefined })
      ).toThrowError()
    })

    test('should successfully add a new schema with fields provided', async () => {
      expect.assertions(1)
      const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
      const schemaKey = 'posts'
      const data = {
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
      expect.assertions(1)
      const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
      return expect(() =>
        api.update({ schemaKey: undefined, data: {} })
      ).toThrowError()
    })

    test('should throw an error if no "data" object is provided', () => {
      expect.assertions(1)
      const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
      return expect(() =>
        api.update({ schemaKey: 'something', data: undefined })
      ).toThrowError()
    })

    test('should successfully update an existing schema with fields provided', async () => {
      expect.assertions(1)
      const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
      const schemaKey = 'products'
      const data = {
        description: 'Updated description',
        enabled: false
      }
      const expected = {
        ...getSchema(schemaKey),
        ...{
          __meta__: {
            createdBy: expect.any(String),
            createdDate: expect.any(String),
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
      expect.assertions(1)
      const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
      return expect(() => api.remove({ schemaKey: undefined })).toThrowError()
    })

    test('should successfully remove an existing schema', async () => {
      const api = getAPI({ ...baseContext, dbType: 'rtdb', firebaseApp })
      const schemaKey = 'products'

      const before = await api.get({ schemaKey })
      expect(before).toEqual(getSchema(schemaKey))

      await api.remove({ schemaKey })

      return expect(api.get({ schemaKey })).resolves.toEqual(null)
    })
  })
})
