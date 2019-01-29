import { FlamelinkContext } from '@flamelink/sdk-app-types'

export interface StoragePublicApi {
  upload(): any
  getFolders(): any
  getFiles(): any
  getFile(): any
  getURL(): any
  deleteFile(): any
  getMetadata(): any
  updateMetadata(): any
  ref(): any
}

export type FlamelinkStorageFactory = (
  context: FlamelinkContext
) => StoragePublicApi
