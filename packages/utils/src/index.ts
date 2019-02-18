import get from 'lodash/get'
import keys from 'lodash/keys'
import castArray from 'lodash/castArray'
import curry from 'lodash/curry'
import reduce from 'lodash/reduce'
import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'
import memoize from 'lodash/memoize'
import pick from 'lodash/fp/pick'
import compose from 'compose-then'
import {
  OrderByOptionsForRTDB,
  FilterOptionsForRTDB,
  OrderByOptionsForCF,
  FilterOptionsForCF,
  LimitOptionsForCF,
  OptionsForCF,
  OptionsForRTDB,
  DocumentSnapshotForCF
} from '@flamelink/sdk-app-types'

interface Memo {
  prepPopulateFields?(args: any): any
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
export const getDefaultImport = (mod: any) =>
  mod && typeof mod === 'object' && 'default' in mod ? mod.default : mod

export function logError(str: string) {
  console.error(`[FLAMELINK] ${str}`)
}

export function logWarning(str: string) {
  console.warn(`[FLAMELINK] ${str}`)
}

export class FlamelinkError extends Error {
  constructor(message: string, public code?: string) {
    super(`[FLAMELINK]: ${message}`)
    this.name = 'FlamelinkError'
  }
}

export const AVAILABLE_FILTER_OPTIONS_FOR_RTDB = [
  'limitToFirst',
  'limitToLast',
  'startAt',
  'endAt',
  'equalTo'
]

export const applyOrderByForRTDB = (
  ref: any,
  options: OrderByOptionsForRTDB
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
  options: FilterOptionsForRTDB = {}
) => {
  if (!keys(options).length) {
    return ref
  }

  return AVAILABLE_FILTER_OPTIONS_FOR_RTDB.reduce((newRef, filter) => {
    const filterValue = options[filter]
    if (typeof filterValue === 'undefined') {
      return newRef
    }
    return newRef[filter](filterValue)
  }, ref)
}

export const applyOptionsForRTDB = (ref: any, options: OptionsForRTDB) => {
  const ordered = applyOrderByForRTDB(ref, options)
  return applyFiltersForRTDB(ordered, options)
}

export const applyOrderByForCF = (ref: any, options: any): any => {
  if (!keys(options).length) {
    return ref
  }

  if (options.orderBy) {
    if (typeof options.orderBy === 'string') {
      return ref.orderBy(options.orderBy, 'asc')
    }

    if (isPlainObject(options.orderBy) && options.orderBy.field) {
      return ref.orderBy(options.orderBy.field, options.orderBy.order || 'asc')
    }

    if (Array.isArray(options.orderBy)) {
      return options.orderBy.reduce(
        (orderedRef: any, option: OrderByOptionsForCF) => {
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
  options: FilterOptionsForCF
): any => {
  if (!keys(options).length) {
    return ref
  }

  if (Array.isArray(options.filters)) {
    return options.filters.reduce((filteredRef: any, clause) => {
      if (Array.isArray(clause)) {
        return filteredRef.where(...clause)
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

const CF_QUERY_CURSORS = ['startAt', 'startAfter', 'endAt', 'endBefore']

export const applyLimitAndOffsetsForCF = (
  ref: any,
  options: LimitOptionsForCF
) => {
  if (!keys(options).length) {
    return ref
  }

  let newRef = CF_QUERY_CURSORS.reduce((updatedRef, cursor) => {
    if (typeof options[cursor] !== 'undefined') {
      return updatedRef[cursor](...castArray(options[cursor]))
    }

    return updatedRef
  }, ref)

  if (get(options, 'limit')) {
    newRef = ref.limit(options.limit)
  }

  return newRef
}

export const pluckResultFields = curry(
  (fields: any, resultSet: any): any => {
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

    // If resultSet is a POJO, we assume each first-level property is the child from which fields need to be plucked
    if (isPlainObject(resultSet)) {
      return reduce(
        resultSet,
        (result, val, key) => Object.assign(result, { [key]: pickFields(val) }),
        {}
      )
    }

    return resultSet
  }
)

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
      : keys(items).map(key => items[key])

    if (!isArray(formattedItems)) {
      throw new FlamelinkError(
        '"formatStructure" should be called with an array of items'
      )
    }

    if (structure === 'nested' || structure === 'tree') {
      const mapChildren = (levelItems: any[], previousId = 0): any[] =>
        levelItems
          .map(item =>
            Object.assign({}, item, {
              children: formattedItems.filter(
                innerItem => innerItem[parentProperty] === item[idProperty]
              )
            })
          )
          .filter(item => item[parentProperty] === previousId)
          .map(item => {
            if (item.children.length === 0) {
              return item
            }
            return Object.assign({}, item, {
              children: mapChildren(item.children, item[idProperty])
            })
          })

      return mapChildren(formattedItems, 0)
    }

    return formattedItems
  }
)

export const applyOptionsForCF = (ref: any, options: OptionsForCF) => {
  const filtered = applyFiltersForCF(ref, options)
  const ordered = applyOrderByForCF(filtered, options)
  return applyLimitAndOffsetsForCF(ordered, options)
}

export const processReferencesForCF = curry(
  async (options: OptionsForCF, document: any): Promise<any> => {
    if (!isPlainObject(document) || !get(options, 'populate')) {
      return document
    }

    const populateAllTheThings = options.populate === true

    let fieldsToPopulate: PopulateFieldOption[]

    if (isArray(options.populate)) {
      fieldsToPopulate = prepPopulateFields(options.populate)
    } else {
      fieldsToPopulate = prepPopulateFields(Object.keys(document))
    }

    return fieldsToPopulate.reduce(async (chain, opt) => {
      const { field, populate } = opt
      const val = document[field]

      if (isRefLike(val)) {
        const processRefs = processReferencesForCF({
          populate: populateAllTheThings ? true : populate
        })
        const snapshot = await val.get()

        if (typeof snapshot.forEach === 'function') {
          const docs: DocumentSnapshotForCF[] = []
          snapshot.forEach(async (doc: DocumentSnapshotForCF) =>
            docs.push(await processRefs(doc.data()))
          )
          return chain.then(acc => Object.assign(acc, { [field]: docs }))
        }

        return chain.then(async acc =>
          Object.assign(acc, { [field]: await processRefs(snapshot.data()) })
        )
      }

      return chain
    }, Promise.resolve({ ...document }))
  }
)

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
export const prepPopulateFields = (populate: any): PopulateFieldOption[] => {
  if (typeof memo.prepPopulateFields === 'undefined') {
    memo.prepPopulateFields = memoize(
      fields => {
        if (!fields || !isArray(fields)) {
          return []
        }

        return fields.map(option => {
          if (typeof option === 'string') {
            return {
              field: option
            }
          }

          return option as PopulateFieldOption
        })
      },
      fields => JSON.stringify(fields)
    )
  }

  return memo.prepPopulateFields(populate)
}
