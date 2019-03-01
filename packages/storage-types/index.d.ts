import App from '@flamelink/sdk-app-types'

type StringOrNumber = string | number

export interface ImageSize {
  width?: StringOrNumber
  maxWidth?: StringOrNumber
  height?: StringOrNumber
  quality?: StringOrNumber
  path?: string
}

interface GetFileArgsForRTDB extends App.RTDB.Options {
  fileId: string
}

interface GetMetadataArgsForRTDB extends App.RTDB.Options {
  fileId: string
}

interface UpdateMetadataArgsForRTDB extends App.RTDB.Options {
  fileId: string
  updates: any
}

interface GetFilesArgsForRTDB extends App.RTDB.Options {
  folderId?: string
  folderName?: string
  mediaType?: 'files' | 'images'
}

interface GetURLArgsForRTDB extends App.RTDB.Options {
  fileId: string
  size?: ImageSize
}

export interface FileObject {
  id: string
  folderId: any
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

interface SubscribeArgsForRTDB extends App.RTDB.Options {
  storageKey?: string
  callback: App.SubscriptionCallback
}

interface GetFileArgsForCF extends App.CF.Options {
  fileId: string
}

interface GetMetadataArgsForCF extends App.CF.Options {
  fileId: string
}

interface UpdateMetadataArgsForCF extends App.CF.Options {
  fileId: string
  updates: any
}

interface GetFilesArgsForCF extends App.CF.Options {
  folderId?: string
  folderName?: string
  mediaType?: 'files' | 'images'
}

interface GetURLArgsForCF extends App.CF.Options {
  fileId: string
  size?: ImageSize
}

interface SubscribeArgsForCF extends App.CF.Options {
  callback: App.SubscriptionCallback
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
  ): App.UnsubscribeMethod

  subscribe?(
    args: SubscribeArgsForRTDB | SubscribeArgsForCF
  ): App.UnsubscribeMethod

  upload(fileData: any, options: UploadOptions): PromiseLike<any>

  getFoldersRaw(options?: App.RTDB.Options | App.CF.Options): Promise<any>

  getFolders(options?: App.RTDB.Options | App.CF.Options): Promise<any>

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

export type FlamelinkStorageFactory = (context: App.Context) => StoragePublicApi
