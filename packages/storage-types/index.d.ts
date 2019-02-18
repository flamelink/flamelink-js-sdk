import {
  FlamelinkContext,
  OptionsForRTDB,
  OptionsForCF,
  SnapshotForCF,
  SubscriptionCallback,
  UnsubscribeMethod
} from '@flamelink/sdk-app-types'

type StringOrNumber = string | number

export type ImageSize = {
  width?: StringOrNumber
  maxWidth?: StringOrNumber
  height?: StringOrNumber
  quality?: StringOrNumber
  path?: string
}

interface GetFileArgsForRTDB extends OptionsForRTDB {
  fileId: string
}

interface GetMetadataArgsForRTDB extends OptionsForRTDB {
  fileId: string
}

interface UpdateMetadataArgsForRTDB extends OptionsForRTDB {
  fileId: string
  updates: any
}

interface GetFilesArgsForRTDB extends OptionsForRTDB {
  folderId?: string
  folderName?: string
  mediaType?: 'files' | 'images'
}

interface GetURLArgsForRTDB extends OptionsForRTDB {
  fileId: string
  size?: ImageSize
}

export interface FileObject {
  id: string
  folderId: StringOrNumber
  file: string
  type: string
  contentType: string
  __meta__?: any
  sizes?: any[]
}

export interface FolderObject {
  id: StringOrNumber
  name: string
  order: number
  parentId: StringOrNumber
  uuid?: StringOrNumber
  __meta__?: any
}

interface SubscribeArgsForRTDB extends OptionsForRTDB {
  storageKey?: string
  callback: SubscriptionCallback
}

interface GetFileArgsForCF extends OptionsForCF {
  fileId: string
}

interface GetMetadataArgsForCF extends OptionsForCF {
  fileId: string
}

interface UpdateMetadataArgsForCF extends OptionsForCF {
  fileId: string
  updates: any
}

interface GetFilesArgsForCF extends OptionsForCF {
  folderId?: string
  folderName?: string
  mediaType?: 'files' | 'images'
}

interface GetURLArgsForCF extends OptionsForCF {
  fileId: string
  size?: ImageSize
}

interface SubscribeArgsForCF extends OptionsForCF {
  callback: SubscriptionCallback
}

interface UploadOptions {
  stringEncoding?: string
  metadata?: object
  folderId?: StringOrNumber
  folderName?: string
  sizes?: ImageSize[]
  overwriteSizes?: boolean
}

export interface StoragePublicApi {
  /**
   * @description Establish and return a reference to section in cloud storage bucket
   * @param {String} filename
   * @returns {Object} Ref object
   */
  ref(filename: string, options?: ImageSize): any

  /**
   * @description Establish and return a reference to a folder in the real-time db
   * @param {String} folderID
   */
  folderRef(folderID?: string): any

  /**
   * @description Establish and return a reference to a file in the real-time db
   * @param {String} fileId
   */
  fileRef(fileId?: string): any

  /**
   * @description Establish and return a reference to the media directory in the real-time db
   * @param {String} [mediaRef] Optional media reference
   */
  mediaRef?(mediaRef?: string): any

  subscribeRaw?(
    args: SubscribeArgsForRTDB | SubscribeArgsForCF
  ): UnsubscribeMethod

  subscribe?(args: SubscribeArgsForRTDB | SubscribeArgsForCF): UnsubscribeMethod

  upload(fileData: any, options: UploadOptions): PromiseLike<any>

  getFoldersRaw(options?: OptionsForRTDB | OptionsForCF): Promise<any>

  getFolders(options?: OptionsForRTDB | OptionsForCF): Promise<any>

  getFileRaw(args: GetFileArgsForRTDB | GetFileArgsForCF): Promise<any>

  getFile(args: GetFileArgsForRTDB | GetFileArgsForCF): Promise<FileObject>

  getFilesRaw(args: GetFilesArgsForRTDB | GetFilesArgsForCF): Promise<any>

  getFiles(args: GetFilesArgsForRTDB | GetFilesArgsForCF): Promise<any>

  getURL(args: GetURLArgsForRTDB | GetURLArgsForCF): Promise<any>

  deleteFile(args: GetFileArgsForRTDB | GetFileArgsForCF): Promise<any>

  getMetadata(args: GetMetadataArgsForRTDB | GetMetadataArgsForCF): Promise<any>

  updateMetadata(
    args: UpdateMetadataArgsForRTDB | UpdateMetadataArgsForCF
  ): Promise<any>

  [key: string]: any
}

export type FlamelinkStorageFactory = (
  context: FlamelinkContext
) => StoragePublicApi
