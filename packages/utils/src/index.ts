import get from 'lodash/get'
import set from 'lodash/set'
import keys from 'lodash/keys'
import castArray from 'lodash/castArray'
import curry from 'lodash/curry'
import reduce from 'lodash/reduce'
import isArray from 'lodash/isArray'
import cloneDeep from 'lodash/cloneDeep'
import isPlainObject from 'lodash/isPlainObject'
import memoize from 'lodash/memoize'
import pick from 'lodash/fp/pick'
import compose from 'compose-then'
import * as App from '@flamelink/sdk-app-types'
import { Timestamp } from '@firebase/firestore-types'

if (Symbol['asyncIterator'] === undefined) {
  ;(Symbol as App.FixMe)['asyncIterator'] = Symbol.for('asyncIterator')
}

type UnknownObject = {
  [key: string]: unknown
}

interface Memo {
  prepPopulateFields?(args: App.FixMe): App.FixMe
}

// Create empty memo object to which we can write for memoization
const memo: Memo = {}

/**
 * @description This method probably doesn't have the best name, but
 * it is used to handle the difference between module systems - it
 * returns the `default` import.
 * @param {Any} `mod` The module being imported
 * @returns The module's default import
 */
export const getDefaultImport = (mod: App.FixMe) =>
  mod && typeof mod === 'object' && 'default' in mod ? mod.default : mod

export function logError(str: string) {
  console.error(`[FLAMELINK] ${str}`)
}

export function logWarning(str: string) {
  console.warn(`[FLAMELINK] ${str}`)
}

export const wrap = curry((key: string, val: any) => ({ [key]: val }))
export const unwrap = curry((key: string, val: any) => val[key])

export class FlamelinkError extends Error {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor(
    message: string,
    public code: string = 'generic-error',
    private showStackTrace: boolean = false
  ) {
    super(`\n${message}\n`)
    this.name = 'FlamelinkError'
    if (!this.showStackTrace) {
      this.stack = null
    }
  }
}

/**
 * @description Check if a given entry is a Flamelink entry object
 * @param entry The object to check
 * @returns {Boolean}
 */
export const isFlamelinkEntry = (entry: any): boolean => {
  if (!isPlainObject(entry)) {
    return false
  }

  // Use Flamelink metadata objects for Cloud Firestore or RTDB as check
  // This can be fleshed out if it causes flase positives for users
  return entry.hasOwnProperty('_fl_meta_') || entry.hasOwnProperty('__meta__')
}

/**
 * Based on Gist found here: https://gist.github.com/mudge/5830382
 */
export class EventEmitter implements App.EventEmitter.Emitter {
  private readonly events: App.EventEmitter.Events = {
    '*': [],
  }

  public on(event: string, listener: App.EventEmitter.Listener): () => void {
    if (typeof this.events[event] !== 'object') {
      this.events[event] = []
    }

    this.events[event].push(listener)

    return () => this.off(event, listener)
  }

  public off(event: string, listener: App.EventEmitter.Listener): void {
    if (typeof this.events[event] !== 'object') {
      return
    }

    this.events[event] = this.events[event].filter(
      (eventListener) => eventListener !== listener
    )
  }

  public offAll(): void {
    Object.keys(this.events).forEach(
      (event: string) => (this.events[event] = [])
    )
  }

  public emit(event: string, ...args: any[]): void {
    if (typeof this.events[event] === 'object') {
      ;[...this.events[event]].forEach((listener) => listener.apply(this, args))
    }

    ;[...this.events['*']].forEach((listener) =>
      listener.apply(this, [event, ...args])
    )
  }

  public once(event: string, listener: App.EventEmitter.Listener): () => void {
    const remove: () => void = this.on(event, (...args: any[]) => {
      remove()
      listener.apply(this, args)
    })
    return remove
  }
}

export class PromiseEmitter extends EventEmitter {
  private state: App.PromiseEmitter.PromiseState = 'PENDING'
  private internalValue: any = null
  private readonly chain: App.PromiseEmitter.ChainItem[] = []

  public constructor(private callback: App.PromiseEmitter.Callback) {
    super()

    if (typeof callback !== 'function') {
      throw new Error('The callback must be a function')
    }

    const reject = (err?: any) => {
      if (this.state !== 'PENDING') {
        return this.internalValue
      }

      this.state = 'REJECTED'
      this.internalValue = err
      ;(async () => {
        for await (const { onRejected } of this.chain) {
          if (typeof onRejected === 'function') {
            return onRejected(err)
          }
        }
      })()
    }

    const resolve = (res?: any) => {
      if (this.state !== 'PENDING') {
        return this.internalValue
      }

      const then = get(res, 'then', null)

      if (typeof then === 'function') {
        return then(resolve, reject)
      }

      this.state = 'FULFILLED'
      this.internalValue = res
      ;(async () => {
        for await (const { onFulfilled } of this.chain) {
          if (typeof onFulfilled === 'function') {
            return onFulfilled(res)
          }
        }
      })()
    }

    try {
      // setTimeout so that it can run in next "tick" browser and server-side
      setTimeout(() => callback(resolve, reject, this), 0)
    } catch (err) {
      reject(err)
    }
  }

  public async then(
    onFulfilled: App.PromiseEmitter.ResolveFn,
    onRejected?: App.PromiseEmitter.RejectFn
  ) {
    if (this.state === 'FULFILLED' && typeof onFulfilled === 'function') {
      return onFulfilled(this.internalValue)
    }

    if (this.state === 'REJECTED' && typeof onRejected === 'function') {
      return onRejected(this.internalValue)
    }

    this.chain.push({ onFulfilled, onRejected })
  }

  public async catch(onRejected?: App.PromiseEmitter.RejectFn) {
    if (this.state === 'FULFILLED') {
      return
    }

    if (this.state === 'REJECTED' && typeof onRejected === 'function') {
      return onRejected(this.internalValue)
    }

    this.chain.push({ onFulfilled: undefined, onRejected })
  }
}

export const getStorageServiceFactory = (context: App.Context): any => {
  if (context.usesAdminApp) {
    return get(context, 'firebaseApp.firebaseInternals_.firebase_.storage')
  }

  return get(
    context,
    'firebaseApp.firebase_.storage',
    get(context, 'firebaseApp.storage')
  )
}

export const getFirestoreServiceFactory = (context: App.Context): any => {
  if (context.usesAdminApp) {
    return get(context, 'firebaseApp.firebaseInternals_.firebase_.firestore')
  }

  return get(
    context,
    'firebaseApp.firebase_.firestore',
    get(context, 'firebaseApp.firestore')
  )
}

export const getAuthServiceFactory = (context: App.Context): App.FixMe => {
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
    return
  }

  if (context.usesAdminApp) {
    return get(context, 'firebaseApp.firebaseInternals_.firebase_.auth')
  }

  return get(
    context,
    'firebaseApp.firebase_.auth',
    get(context, 'firebaseApp.auth')
  )
}

export const getTimestamp = (context: App.Context): string | Timestamp => {
  if (context.dbType === 'cf') {
    return get(getFirestoreServiceFactory(context), 'Timestamp.now', () =>
      new Date().toISOString()
    )()
  }

  return new Date().toISOString()
}

export const getCurrentUser = (context: App.Context): string => {
  const auth = getAuthServiceFactory(context)

  if (typeof auth !== 'function') {
    return 'UNKNOWN'
  }

  return get(auth(), 'currentUser.uid', 'UNKNOWN')
}

export const AVAILABLE_FILTER_OPTIONS_FOR_RTDB = [
  'limitToFirst',
  'limitToLast',
  'startAt',
  'endAt',
  'equalTo',
]

export const CF_QUERY_CURSORS = ['startAt', 'startAfter', 'endAt', 'endBefore']

export const hasNonCacheableOptionsForRTDB = (options: any): any => {
  const optionKeys = keys(options)
  const nonCacheableProps = [
    'noCache',
    'event',
    'orderByValue',
    'orderByChild',
    ...AVAILABLE_FILTER_OPTIONS_FOR_RTDB,
  ]

  return optionKeys.some((key) => nonCacheableProps.includes(key))
}

export const hasNonCacheableOptionsForCF = (options: any): any => {
  const optionKeys = keys(options)
  const nonCacheableProps = [
    'noCache',
    'includeMetadataChanges',
    'source',
    'changeType',
    'limit',
    ...CF_QUERY_CURSORS,
  ]

  return optionKeys.some((key) => nonCacheableProps.includes(key))
}

export const applyOrderByForRTDB = (
  ref: any,
  options: App.RTDB.OrderByOptions
) => {
  if (options.orderByChild) {
    if (
      typeof options.orderByChild !== 'string' ||
      options.orderByChild === ''
    ) {
      throw new FlamelinkError(
        '"orderByChild" should specify the child key to order by'
      )
    }
    return ref.orderByChild(options.orderByChild)
  }

  if (options.orderByValue) {
    return ref.orderByValue()
  }

  if (options.orderByKey) {
    return ref.orderByKey()
  }

  return ref
}

export const applyFiltersForRTDB = (
  ref: any,
  options: App.RTDB.FilterOptions = {}
) => {
  if (!keys(options).length) {
    return ref
  }

  return AVAILABLE_FILTER_OPTIONS_FOR_RTDB.reduce((newRef, filter) => {
    const filterValue = options[filter]
    if (typeof filterValue === 'undefined') {
      return newRef
    }
    return newRef[filter](...castArray(filterValue))
  }, ref)
}

export const applyOptionsForRTDB = (ref: any, options: App.RTDB.Options) => {
  const ordered = applyOrderByForRTDB(ref, options)
  return applyFiltersForRTDB(ordered, options)
}

export const applyOrderByForCF = (ref: any, options: any): any => {
  if (!keys(options).length) {
    return ref
  }

  if (options.orderBy) {
    if (typeof options.orderBy === 'string') {
      return ref.orderBy ? ref.orderBy(options.orderBy, 'asc') : ref
    }

    if (isPlainObject(options.orderBy) && options.orderBy.field) {
      return ref.orderBy
        ? ref.orderBy(options.orderBy.field, options.orderBy.order || 'asc')
        : ref
    }

    if (Array.isArray(options.orderBy)) {
      return options.orderBy.reduce(
        (orderedRef: any, option: App.CF.OrderByOptions) => {
          return applyOrderByForCF(orderedRef, { orderBy: option })
        },
        ref
      )
    }

    logWarning('Ignored invalid "orderBy" parameters supplied.')
  }

  return ref
}

export const applyFiltersForCF = (
  ref: any,
  options: App.CF.FilterOptions
): any => {
  if (!keys(options).length) {
    return ref
  }

  if (Array.isArray(options.filters)) {
    return options.filters.reduce((filteredRef: any, clause) => {
      if (Array.isArray(clause)) {
        return filteredRef.where ? filteredRef.where(...clause) : filteredRef
      }

      logWarning(
        `The following invalid "filter" clause has been ignored: ${JSON.stringify(
          clause
        )}`
      )

      return filteredRef
    }, ref)
  }

  return ref
}

export const applyLimitAndOffsetsForCF = (
  ref: any,
  options: App.CF.LimitOptions
) => {
  if (!keys(options).length) {
    return ref
  }

  let newRef = CF_QUERY_CURSORS.reduce((updatedRef, cursor) => {
    if (typeof options[cursor] !== 'undefined') {
      return updatedRef[cursor]
        ? updatedRef[cursor](...castArray(options[cursor]))
        : updatedRef
    }

    return updatedRef
  }, ref)

  if (get(options, 'limit')) {
    newRef = newRef.limit ? newRef.limit(options.limit) : newRef
  }

  return newRef
}

export const pluckResultFields = curry((fields: any, resultSet: any): any => {
  if (!resultSet || !isArray(fields)) {
    return resultSet
  }

  // TODO: Write our own "pick" that can work with an array of strings or an array of objects for nested objects
  const pickFields = pick(fields)

  // If resultSet is an array of objects, we just pluck the given fields from each object
  if (isArray(resultSet)) {
    return reduce(
      resultSet,
      (result, val) => result.concat(pickFields(val)),
      []
    )
  }

  if (isFlamelinkEntry(resultSet)) {
    return pickFields(resultSet)
  }

  // If resultSet is a POJO, we assume each first-level property is the child from which fields need to be plucked
  if (isPlainObject(resultSet)) {
    return reduce(
      resultSet,
      (result, val, key) => Object.assign(result, { [key]: pickFields(val) }),
      {}
    )
  }

  return resultSet
})

/**
 * @description Check if a given value is a Firebase/Firestore reference.
 * This should only be used for field values returned from Firebase.
 * @param value The value you want to check
 * @returns {Boolean}
 */
export const isRefLike = (value: any): boolean => {
  if (typeof value !== 'object') {
    return false
  }

  return typeof get(value, 'get') === 'function'
}

interface StructureOptions {
  idProperty?: string
  parentProperty?: string
}

export const formatStructure = curry(
  (structure: string, options: StructureOptions, items: any): any[] => {
    const { idProperty = 'id', parentProperty = 'parentId' } = options || {}

    const formattedItems: any[] = isArray(items)
      ? items
      : keys(items).map((key) => items[key])

    if (!isArray(formattedItems)) {
      throw new FlamelinkError(
        '"formatStructure" should be called with an array of items'
      )
    }

    if (structure === 'nested' || structure === 'tree') {
      const DEFAULT_PARENT_ID = 0

      const mapChildren = (
        levelItems: any[],
        previousId = DEFAULT_PARENT_ID
      ): any[] =>
        levelItems
          .map((item) => ({
            ...item,
            children: formattedItems.filter(
              (innerItem) =>
                get(innerItem, parentProperty) === get(item, idProperty)
            ),
          }))
          .filter(
            (item) =>
              get(item, parentProperty, DEFAULT_PARENT_ID) === previousId
          )
          .map((item) => {
            if (item.children.length === 0) {
              return item
            }
            return {
              ...item,
              children: mapChildren(item.children, get(item, idProperty)),
            }
          })
      return mapChildren(formattedItems, DEFAULT_PARENT_ID)
    }

    return formattedItems
  }
)

export const applyOptionsForCF = (ref: any, options: App.CF.Options) => {
  const filtered = applyFiltersForCF(ref, options)
  const ordered = applyOrderByForCF(filtered, options)
  return applyLimitAndOffsetsForCF(ordered, options)
}

interface PopulateFieldOption {
  field: string
  [key: string]: any
}

/**
 * @description Ensure that the passed in `populate` property is returning an array of objects
 * required by other populate functions.
 * @param {Array} `populate` Can be an array of strings, objects or a mix
 * @returns {Array} Always an array of objects in the format `{ field: nameOfFieldToPopulate, ...otherOptions }`
 */
export const prepPopulateFields = (
  populate?: string[] | PopulateFieldOption | PopulateFieldOption[]
): PopulateFieldOption[] => {
  if (typeof memo.prepPopulateFields === 'undefined') {
    memo.prepPopulateFields = memoize(
      (fields) => {
        if (!fields || !isArray(fields)) {
          return []
        }

        return fields.map((option) => {
          if (typeof option === 'string') {
            return {
              field: option,
            }
          }

          return option as PopulateFieldOption
        })
      },
      (fields) => JSON.stringify(fields)
    )
  }

  return memo.prepPopulateFields(populate)
}

const isFileObject = (obj: Record<string, unknown>) => {
  return (
    obj.hasOwnProperty('file') &&
    obj.hasOwnProperty('id') &&
    obj.hasOwnProperty('contentType') &&
    obj.hasOwnProperty('folderId')
  )
}

export const patchFileUrlForCF = curry(
  async (context: App.Context, options: App.CF.Options, entry: any) => {
    if (!isPlainObject(entry)) {
      return entry
    }

    const storage = get(context, 'modules.storage')

    const patchURL = async (file: any) => {
      if (!storage) {
        logWarning(
          'The Flamelink "storage" module is not available. Please make sure it is imported and try again.'
        )

        return file
      }

      const url = await storage.getURL({
        fileId: file.id,
        size: options.size,
      })
      return set(file, 'url', url)
    }

    const processEntry = async (item: any): Promise<any> => {
      if (Array.isArray(item)) {
        return Promise.all(
          item.map(async (innerEntry) => processEntry(innerEntry))
        )
      }

      if (isPlainObject(item)) {
        if (isFileObject(item)) {
          return patchURL(item)
        }

        const processedProps = await Promise.all(
          keys(item).map(async (propKey) => {
            return { propKey, propValue: await processEntry(item[propKey]) }
          })
        )

        return processedProps.reduce(
          (processedEntry, processedProp) => {
            return set(
              processedEntry,
              processedProp.propKey,
              processedProp.propValue
            )
          },
          { ...item }
        )
      }

      return item
    }

    return processEntry(entry)
  }
)

export const processReferencesForCF = curry(
  async (
    context: App.Context,
    options: App.CF.Options,
    document: any
  ): Promise<any> => {
    if (!isPlainObject(document) || !get(options, 'populate')) {
      return document
    }

    const firestoreService = get(context, 'services.firestore')

    if (!firestoreService) {
      return document
    }

    const populateAllTheThings = options.populate === true

    let fieldsToPopulate: PopulateFieldOption[] = []

    if (isArray(options.populate)) {
      fieldsToPopulate = prepPopulateFields(options.populate)
    } else if (populateAllTheThings) {
      fieldsToPopulate = prepPopulateFields(Object.keys(document))
    }

    const populatedFields = await Promise.all(
      fieldsToPopulate.map(async (opt) => {
        const { field, populate, subFields, fields } = opt
        const val = get(document, field)

        const patchUrl = patchFileUrlForCF(context, opt)
        const pluckFields = pluckResultFields(fields)

        const processRefs = processReferencesForCF(context, {
          populate: populateAllTheThings
            ? true
            : Array.isArray(subFields)
            ? subFields
            : populate,
        })

        const processRef = async (ref: { path: string }) => {
          const snapshot = await firestoreService.doc(ref.path).get()

          if (typeof snapshot.forEach === 'function') {
            const docs: Promise<any>[] = []
            snapshot.forEach(async (doc: App.CF.DocumentSnapshot) =>
              docs.push(processRefs(doc.data()))
            )

            return Promise.all(docs)
          }

          return await compose(processRefs, patchUrl)(snapshot.data())
        }

        let fieldValue = val

        if (Array.isArray(val)) {
          fieldValue = await Promise.all(
            val.map(async (innerRef) => {
              if (isRefLike(innerRef)) {
                return processRef(innerRef)
              }

              return processRefs(innerRef)
            })
          )
        } else if (isPlainObject(val)) {
          fieldValue = await processRefs(val)
        } else if (isRefLike(val)) {
          fieldValue = await processRef(val)
        }

        return { fieldKey: field, fieldValue: pluckFields(fieldValue) }
      })
    )

    return populatedFields.reduce(
      (newDocument, populatedField) => {
        return set(
          newDocument,
          populatedField.fieldKey,
          populatedField.fieldValue
        )
      },
      { ...document }
    )
  }
)

export const populateEntriesForCF = curry(
  async (context: App.Context, options: App.CF.Options, entries: unknown) => {
    if (Array.isArray(entries)) {
      return Promise.all(
        entries.map(async (entry) =>
          processReferencesForCF(context, options, entry)
        )
      )
    }

    if (isPlainObject(entries)) {
      const populatedEntries = await Promise.all(
        keys(entries).map(async (key) =>
          processReferencesForCF(
            context,
            options,
            (entries as UnknownObject)[key]
          )
        )
      )

      return populatedEntries.reduce(
        (acc: unknown, entry) =>
          Object.assign(acc, {
            [get(entry, '_fl_meta_.fl_id', entry.id)]: entry,
          }),
        {}
      )
    }

    return entries
  }
)

/**
 * @description Utility to get the result of a given function invoked for a given list of items in sequence.
 * Like `Promise.all()` but instead of parallel, promises resolve in sequence
 * @param {Function} promiseFn Function that should be invoked for each item in the given array.
 * @param {Array} list Array of items that passed to the `promiseFn`
 * @returns {Promise} Resolves to array of arrays. Each internal array is the result of invoking the given function for each item
 */
export const createQueue = curry((promiseFn: any, list: any[]) => ({
  start: () =>
    list.reduce(
      (queue, item, key) =>
        queue.then(async (result: any[]) => {
          const itemResult = await promiseFn(item, key)
          return result.concat([itemResult])
        }),
      Promise.resolve([])
    ),
}))

const getPopulateFieldsForSchema = async (
  schemasAPI: any,
  schemaFields: SchemaField[]
): Promise<any[]> =>
  schemaFields.reduce(async (chain, field) => {
    switch (field.type) {
      case 'media':
        return chain.then((result: any[]) =>
          result.concat({ field: field.key })
        )

      case 'select-relational':
      case 'tree-relational':
        return chain.then(async (result: any[]) =>
          result.concat({
            field: field.key,
            populate: await getPopulateFieldsForSchema(
              schemasAPI,
              await schemasAPI.getFields({ schemaKey: field.relation })
            ),
          })
        )

      case 'fieldset':
      case 'repeater':
        return chain.then(async (result: any[]) =>
          result.concat({
            field: field.key,
            subFields: await getPopulateFieldsForSchema(
              schemasAPI,
              field.options
            ),
          })
        )

      default:
        return chain
    }
  }, Promise.resolve([]))

interface GridColumns {
  lg?: number
  md?: number
  sm?: number
  xs?: number
}

interface SchemaFieldConstraint {
  rule: string
  ruleValue?: any
}

interface SchemaField {
  key: string
  description: string
  title: string
  hidden: boolean
  show: boolean
  type: string
  gridColumns: GridColumns
  defaultValue?: any
  multiple?: boolean
  relation?: string
  relationFieldsToShow?: string[]
  fieldSeparator?: string
  constraints?: SchemaFieldConstraint[]
  [key: string]: any
}

const getFieldsToPopulate = (
  preppedPopulateFields: PopulateFieldOption[],
  schemaFields: SchemaField[]
): PopulateFieldOption[] => {
  return preppedPopulateFields.reduce((fields, preppedField) => {
    const schemaField =
      schemaFields &&
      schemaFields.find((field) => field.key === preppedField.field)

    if (!schemaField) {
      return fields
    }

    // Relational Fields
    if (schemaField.relation) {
      return fields.concat([
        {
          ...preppedField,
          contentType: schemaField.relation,
          populateType: 'relational',
        },
      ])
    }

    // Media Fields
    if (schemaField.type === 'media') {
      return fields.concat([{ ...preppedField, populateType: 'media' }])
    }

    // Repeater Fields
    if (schemaField.type === 'repeater' && isArray(preppedField.subFields)) {
      return fields.concat([{ ...preppedField, populateType: 'repeater' }])
    }

    // Fieldset Fields
    if (schemaField.type === 'fieldset' && isArray(preppedField.subFields)) {
      return fields.concat([{ ...preppedField, populateType: 'fieldset' }])
    }

    return fields
  }, [])
}

/**
 * TODO: This needs a proper refactor and type fix - so far it has been loosely copied over from previous JS version
 */
export const populateEntry = curry(
  async (
    context: App.Context,
    contentType: string,
    populate: any,
    originalEntry: any
  ) => {
    if (!originalEntry) {
      return originalEntry
    }

    const entryKeys = keys(originalEntry)

    if (entryKeys.length === 0) {
      throw new FlamelinkError(
        '"populateEntry" should be called with an object of objects'
      )
    }

    const contentAPI = context.modules.content
    const schemasAPI = context.modules.schemas
    const storageAPI = context.modules.storage

    const processEntry = curry(
      async (
        entry: any,
        schemaFields: SchemaField[],
        preppedPopulateFields: PopulateFieldOption[],
        entryKey: string
      ) => {
        if (!preppedPopulateFields[0]) {
          return entry
        }

        const fieldsToPopulate = getFieldsToPopulate(
          preppedPopulateFields,
          schemaFields
        )

        if (!fieldsToPopulate[0]) {
          return entry
        }

        const populatedFields = await Promise.all(
          fieldsToPopulate.map(async (populateField) => {
            const {
              field,
              subFields,
              contentType: innerContentType,
              populateType,
            } = populateField

            switch (populateType) {
              case 'media':
                // if it exists, the entry value for this field should be an array
                if (entry[entryKey] && entry[entryKey].hasOwnProperty(field)) {
                  const mediaEntries = entry[entryKey][field] || []

                  if (!isArray(mediaEntries)) {
                    throw new FlamelinkError(
                      `The "${field}" field does not seem to be a valid media property.`
                    )
                  }

                  return Promise.all(
                    mediaEntries.map(async (innerEntryKey) => {
                      const pluckFields = pluckResultFields(
                        populateField.fields
                      )
                      const populateFields = populateEntry(
                        context,
                        innerContentType,
                        populateField.populate
                      )

                      const [fileObject, fileURL] = await Promise.all([
                        storageAPI.getFile({
                          ...populateField,
                          fileId: innerEntryKey,
                        }),
                        storageAPI.getURL({
                          ...populateField,
                          fileId: innerEntryKey,
                        }),
                      ])

                      return await compose(
                        unwrap(innerEntryKey),
                        populateFields,
                        pluckFields,
                        wrap(innerEntryKey)
                      )({ ...fileObject, url: fileURL })
                    })
                  )
                }

                return null

              case 'relational':
                // if it exists, the entry value for this field should be an array
                if (entry[entryKey] && entry[entryKey].hasOwnProperty(field)) {
                  let relationalEntries: string[] = entry[entryKey][field]

                  relationalEntries = castArray(relationalEntries)

                  return Promise.all(
                    relationalEntries.map(async (innerEntryKey) => {
                      return contentAPI.get({
                        ...populateField,
                        schemaKey: innerContentType,
                        entryId: innerEntryKey,
                      })
                    })
                  )
                }

                return null

              case 'repeater':
                // if it exists, the entry value for this field should be an array
                if (entry[entryKey] && entry[entryKey].hasOwnProperty(field)) {
                  const repeaterFields = entry[entryKey][field] || []

                  if (!isArray(repeaterFields)) {
                    throw new FlamelinkError(
                      `The "${field}" field does not seem to be a valid repeater field.`
                    )
                  }

                  const schemaField =
                    schemaFields && schemaFields.find((f) => f.key === field)

                  return Promise.all(
                    repeaterFields.map(async (repeaterField, repeaterIndex) => {
                      const repeaterIndexKey = repeaterIndex.toString()
                      const processedRepeaterField = await processEntry(
                        wrap(repeaterIndexKey, repeaterField),
                        schemaField.options || [],
                        prepPopulateFields(subFields),
                        repeaterIndexKey
                      )

                      return unwrap(repeaterIndexKey, processedRepeaterField)
                    })
                  )
                }

                return null

              case 'fieldset':
                // if it exists, the entry value for this field should be an object
                if (entry[entryKey] && entry[entryKey].hasOwnProperty(field)) {
                  const fieldsetFields = entry[entryKey][field]

                  if (!isPlainObject(fieldsetFields)) {
                    throw new FlamelinkError(
                      `The "${field}" field does not seem to be a valid fieldset field.`
                    )
                  }

                  const schemaField =
                    schemaFields && schemaFields.find((f) => f.key === field)

                  const processedFieldsetFields = await Promise.all(
                    keys(fieldsetFields).map(
                      async (fieldsetKey, fieldsetIndex) => {
                        const fieldsetIndexKey = fieldsetIndex.toString()
                        const processedFieldsetField = await processEntry(
                          wrap(fieldsetIndexKey, {
                            [fieldsetKey]: fieldsetFields[fieldsetKey],
                          }), // entry
                          schemaField.options || [], // schemaFields
                          prepPopulateFields(subFields), // populate fields
                          fieldsetIndexKey // entry key
                        )

                        return unwrap(fieldsetIndexKey, processedFieldsetField)
                      }
                    )
                  )

                  return processedFieldsetFields.reduce(
                    (sum, fieldsetField) => Object.assign(sum, fieldsetField),
                    {}
                  )
                }

                return null

              default:
                return entry[entryKey][field]
            }
          })
        )

        return fieldsToPopulate.reduce(
          (populatedEntry: any, populateField: any, index: any) => {
            const { field } = populateField
            if (
              populatedEntry[entryKey] &&
              populatedEntry[entryKey].hasOwnProperty(field)
            ) {
              populatedEntry[entryKey][field] = populatedFields[index] // eslint-disable-line no-param-reassign
            }
            return populatedEntry
          },
          cloneDeep(entry)
        )
      }
    )

    const schemaFields: SchemaField[] = await schemasAPI.getFields({
      schemaKey: contentType,
    })

    if (populate === true) {
      populate = await getPopulateFieldsForSchema(schemasAPI, schemaFields)
    }

    const preppedPopulateFields = prepPopulateFields(populate)
    const entries = await Promise.all(
      entryKeys.map(
        processEntry(originalEntry, schemaFields, preppedPopulateFields)
      )
    )

    return entryKeys.reduce(
      (populatedEntries, entryKey, index) =>
        Object.assign(populatedEntries, {
          [entryKey]: entries[index][entryKey],
        }),
      {}
    )
  }
)

export const populateEntries = curry(
  async (
    context: App.Context,
    contentType: string,
    populate: any,
    entries: any[]
  ) => {
    if (!Array.isArray(entries)) {
      return []
    }

    return Promise.all(
      entries.map(async (entry) =>
        populateEntry(context, contentType, populate, entry)
      )
    )
  }
)
