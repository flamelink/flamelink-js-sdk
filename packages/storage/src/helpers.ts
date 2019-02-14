import curry from 'lodash/curry'
import reduce from 'lodash/reduce'

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
  const pixelRatio = 'devicePixelRatio' in window ? window.devicePixelRatio : 1
  return Math.max(window.screen.width, window.screen.height) * pixelRatio
}
