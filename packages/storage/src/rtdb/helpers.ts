/**
 * @description Return the reference path for the given file in the realtime db
 * @param {String} fileID
 */
export const getFileRefPath = (fileID?: string) =>
  `/flamelink/media/files/${fileID || ''}`

/**
 * @description Return the reference path for the given folder in the realtime db
 * @param {String} folderID
 */
export const getFolderRefPath = (folderID?: string) =>
  `/flamelink/media/folders/${folderID || ''}`
