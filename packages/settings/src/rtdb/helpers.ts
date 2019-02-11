import keys from 'lodash/keys'
import curry from 'lodash/curry'
import reduce from 'lodash/reduce'
import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'
import pick from 'lodash/fp/pick'
import { FlamelinkError } from '@flamelink/sdk-utils'
import {
  OrderByOptionsForRTDB,
  FilterOptionsForRTDB
} from '@flamelink/sdk-app-types'

export const getSettingsRefPath = (ref: string) =>
  `/flamelink/settings/${ref || ''}`

export const AVAILABLE_FILTER_OPTIONS = [
  'limitToFirst',
  'limitToLast',
  'startAt',
  'endAt',
  'equalTo'
]

export const applyOrderBy = (ref: any, options: OrderByOptionsForRTDB = {}) => {
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

export const applyFilters = (ref: any, options: FilterOptionsForRTDB = {}) => {
  if (!keys(options).length) {
    return ref
  }

  return AVAILABLE_FILTER_OPTIONS.reduce((newRef, filter) => {
    const filterValue = options[filter]
    if (typeof filterValue === 'undefined') {
      return newRef
    }
    return newRef[filter](filterValue)
  }, ref)
}

export const pluckResultFields = curry(
  (fields: any, resultSet: any[]): any => {
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
