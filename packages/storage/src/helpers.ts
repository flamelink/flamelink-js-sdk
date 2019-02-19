import curry from 'lodash/curry'
import reduce from 'lodash/reduce'
import { ImageSize } from '@flamelink/sdk-storage-types'
import { logWarning, FlamelinkError } from '@flamelink/sdk-utils'

export const filterFilesByFolderId = curry(
  (folderId: string, files: any): any => {
    if (!folderId) {
      return files
    }

    return reduce(
      files,
      (result, val, key) => {
        if (String(val.folderId) === String(folderId)) {
          return Object.assign(result, { [key]: val })
        }
        return result
      },
      {}
    )
  }
)

/**
 * @description Find the current device's screen resolution
 */
export const getScreenResolution = (): number => {
  if (typeof window === 'undefined') {
    throw new FlamelinkError(
      `The device's screen resolution can only be retrieved from a browser environment.`,
      'incompatibility'
    )
  }

  const pixelRatio = 'devicePixelRatio' in window ? window.devicePixelRatio : 1
  return Math.max(window.screen.width, window.screen.height) * pixelRatio
}

/**
 * @description Return the reference path for the given file in the Cloud Storage Bucket
 * @param {String} filename
 * @param {Object} options
 */
export const getStorageRefPath = (
  filename: string,
  { width, path }: ImageSize = {}
) => {
  if (path) {
    return `/flamelink/media/sized/${path}/${filename}`
  }
  return `/flamelink/media/${width ? `sized/${width}/` : ''}${filename}`
}

export const setImagePathByClosestSize = (
  storageRefArgs: any,
  availableFileSizes: any[],
  minSize: number
) => {
  const smartWidth = availableFileSizes
    .map(
      availableSize =>
        Object.assign({}, availableSize, {
          width: parseInt(availableSize.width || availableSize.maxWidth, 10)
        }),
      []
    )
    .sort((a, b) => a.width - b.width) // sort widths ascending
    .find(availableSize => availableSize.width >= minSize)

  if (smartWidth) {
    storageRefArgs.options = Object.assign(storageRefArgs.options, smartWidth)
  } else {
    logWarning(
      `The provided size (${minSize}) has been ignored because it did not match any of the given file's available sizes.\nAvailable sizes: ${availableFileSizes
        .map(availableSize => availableSize.width)
        .join(', ')}`
    )
  }
}
