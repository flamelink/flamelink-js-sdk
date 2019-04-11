import { FirebaseApp } from '@firebase/app-types'
import { Context, UnsubscribeMethod } from '@flamelink/sdk-app-types'
import { Api } from '@flamelink/sdk-schemas-types'
import get from 'lodash/get'
import set from 'lodash/set'
import cloneDeep from 'lodash/cloneDeep'
import uniqueId from 'lodash/uniqueId'
import getAPI from '../index'
import { EventEmitter } from '../../../../app/src/event-emitter'
import {
  initializeFirestoreProject,
  getBaseContext
} from '../../../../../tools/testing/firebase'
import { getAllSchemas, getSchema } from '../../../../../fixtures/schemas'

describe('- CF Schemas', () => {
  let api: Api
  let unsubscribe: UnsubscribeMethod

  beforeEach(async () => {
    const firebaseApp: FirebaseApp = await initializeFirestoreProject({
      projectId: uniqueId('project-')
    })

    const context: Context = getBaseContext({
      dbType: 'cf',
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
      const allSchemas = getAllSchemas({ dbType: 'cf' })
      const expected = Object.keys(allSchemas).reduce((acc, schemaKey) => {
        return set(acc, `${schemaKey}._fl_meta_.docId`, expect.any(String))
      }, cloneDeep(allSchemas))

      return expect(api.get()).resolves.toEqual(expected)
    })

    test('should return a specific schema if a "schemaKey" is provided for an existing schema', () => {
      const schemaKey = 'products'
      return expect(api.get({ schemaKey })).resolves.toEqual(
        getSchema({ dbType: 'cf', schemaKey, docId: 'EBNiExsNqIJ3n4UKVEYg' })
      )
    })

    test('should return `null` if a "schemaKey" is provided for a non-existing schema', () => {
      const schemaKey = 'this-schema-does-not-exist'
      return expect(api.get({ schemaKey })).resolves.toEqual(null)
    })
  })

  describe('- "getFields"', () => {
    test('should return the fields for all schemas if no "schemaKey" is provided', () => {
      const allSchemas = getAllSchemas({ dbType: 'cf' })
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
        getSchema({ dbType: 'cf', schemaKey }).fields
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
        const allSchemas = getAllSchemas({ dbType: 'cf' })
        const expected = Object.keys(allSchemas).reduce((acc, schemaKey) => {
          return set(acc, `${schemaKey}._fl_meta_.docId`, expect.any(String))
        }, cloneDeep(allSchemas))

        unsubscribe = api.subscribe({
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
        unsubscribe = api.subscribe({
          schemaKey,
          callback(err, schemas) {
            if (err) {
              return reject(err)
            }

            expect(schemas).toEqual(
              getSchema({
                dbType: 'cf',
                schemaKey,
                docId: 'EBNiExsNqIJ3n4UKVEYg'
              })
            )
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
        const allSchemas = getAllSchemas({ dbType: 'cf' })
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
              getSchema({ dbType: 'cf', schemaKey }).fields
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
      return expect(() =>
        api.add({ schemaKey: undefined, data: {} })
      ).toThrowError()
    })

    test('should throw an error if no "data" object is provided', () => {
      return expect(() =>
        api.add({ schemaKey: 'something', data: undefined })
      ).toThrowError()
    })

    test('should successfully add a new schema with fields provided', async () => {
      const schemaKey = 'posts'
      const data = {
        title: 'Posts',
        description: 'Test posts schema',
        enabled: false,
        type: 'collection'
      }
      const expected = {
        _fl_meta_: {
          createdBy: expect.any(String),
          createdDate: expect.anything(), // CF timestamps not working well for emulators
          docId: expect.any(String),
          env: expect.any(String),
          fl_id: 'posts'
        },
        description: 'Test posts schema',
        enabled: false,
        group: '',
        icon: '',
        id: 'posts',
        sortable: true,
        title: 'Posts',
        type: 'collection',
        fields: [] as any[]
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
      ).rejects.toThrow(
        '"update" called with the incorrect arguments. Check the docs for details.'
      )
    })

    test('should throw an error if no "data" object is provided', () => {
      return expect(
        api.update({ schemaKey: 'something', data: undefined })
      ).rejects.toThrow(
        '"update" called with the incorrect arguments. Check the docs for details.'
      )
    })

    test('should successfully update an existing schema with fields provided', async () => {
      const schemaKey = 'products'
      const data = {
        description: 'Updated description',
        enabled: false
      }
      const expected = {
        ...getSchema({ dbType: 'cf', schemaKey }),
        ...{
          _fl_meta_: {
            createdBy: expect.any(String),
            createdDate: expect.objectContaining({
              nanoseconds: expect.any(Number),
              seconds: expect.any(Number)
            }),
            lastModifiedBy: expect.any(String),
            lastModifiedDate: expect.anything(),
            docId: expect.any(String),
            env: expect.any(String),
            fl_id: 'products'
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
      return expect(api.remove({ schemaKey: undefined })).rejects.toThrow()
    })

    test('should successfully remove an existing schema', async () => {
      const schemaKey = 'productCategory'

      const before = await api.get({ schemaKey })
      const expected = {
        ...getSchema({ dbType: 'cf', schemaKey }),
        ...{
          _fl_meta_: {
            createdBy: expect.any(String),
            createdDate: expect.objectContaining({
              nanoseconds: expect.any(Number),
              seconds: expect.any(Number)
            }),
            lastModifiedBy: expect.any(String),
            lastModifiedDate: expect.objectContaining({
              nanoseconds: expect.any(Number),
              seconds: expect.any(Number)
            }),
            docId: expect.any(String),
            env: expect.any(String),
            fl_id: expect.any(String)
          }
        }
      }
      expect(before).toEqual(expected)

      await api.remove({ schemaKey })

      return expect(api.get({ schemaKey })).resolves.toEqual(null)
    })
  })
})
