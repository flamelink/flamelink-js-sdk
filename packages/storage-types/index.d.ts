import App from '@flamelink/sdk-app-types'

// eslint-disable-next-line no-redeclare
declare namespace Storage {
  interface ImageSize {
    width?: App.StringOrNumber
    maxWidth?: App.StringOrNumber
    height?: App.StringOrNumber
    quality?: App.StringOrNumber
    path?: string
  }

  interface FileObject {
    id: string
    folderId: any
    file: string
    type: string
    contentType: string
    __meta__?: any
    sizes?: any[]
  }

  interface FolderObject {
    id: App.StringOrNumber
    name: string
    order: number
    parentId: App.StringOrNumber
    uuid?: App.StringOrNumber
    __meta__?: any
  }

  interface UploadOptions {
    stringEncoding?: string
    metadata?: object
    folderId?: App.StringOrNumber
    folderName?: string
    sizes?: Storage.ImageSize[]
    overwriteSizes?: boolean
  }

  namespace RTDB {
    interface Get extends App.RTDB.Options {
      storageKey?: string
    }

    interface GetFile extends App.RTDB.Options {
      fileId: string
    }

    interface GetFiles extends App.RTDB.Options {
      folderId?: string
      folderName?: string
      mediaType?: 'files' | 'images'
    }

    interface GetURL extends GetFile {
      size?: Storage.ImageSize
    }

    interface GetMetadata extends App.RTDB.Options {
      fileId: string
    }

    interface UpdateMetadata extends App.RTDB.Options {
      fileId: string
      updates: any
    }
  }

  namespace CF {
    interface Get extends App.CF.Options {
      storageKey?: string
    }

    interface GetFile extends App.CF.Options {
      fileId: string
    }

    interface GetFiles extends App.CF.Options {
      folderId?: string
      folderName?: string
      mediaType?: 'files' | 'images'
    }

    interface GetURL extends GetFile {
      size?: ImageSize
    }

    interface GetMetadata extends App.CF.Options {
      fileId: string
    }

    interface UpdateMetadata extends App.CF.Options {
      fileId: string
      updates: any
    }
  }

  export interface Api {
    /**
     * @description Establish and return a reference to section in Cloud Storage Bucket
     * @param {string} filename
     * @param {object} [options={}] - Optional image size options
     * @returns {object} Storage bucker reference object
     */
    ref(filename: string, options?: ImageSize): any

    /**
     * @description Establish and return a reference to a folder in the db
     * @param {string} folderID
     * @returns {object} Folder reference object
     */
    folderRef(folderID?: string): any

    /**
     * @description Establish and return a reference to a file in the db
     * @param {string} fileId
     * @returns {object} File reference object
     */
    fileRef(fileId?: string): any

    getFoldersRaw(options: App.RTDB.Options): Promise<any>
    getFoldersRaw(options: App.CF.Options): Promise<any>

    getFolders(options: App.RTDB.Options): Promise<any>
    getFolders(options: App.CF.Options): Promise<any>

    getFileRaw(options: RTDB.GetFile): Promise<any>
    getFileRaw(options: CF.GetFile): Promise<any>

    /**
     * Get individual file object from DB.
     * @param {object} options - All standard filter properties can be specified + the specific File ID
     * @param {string} options.fileId - ID of file to query
     * @returns {Promise} Resolves to file object for given file ID
     */
    getFile(options: RTDB.GetFile): Promise<FileObject>
    getFile(options: CF.GetFile): Promise<FileObject>

    getFilesRaw(options: RTDB.GetFiles): Promise<any>
    getFilesRaw(options: CF.GetFiles): Promise<any>

    getFiles(options: RTDB.GetFiles): Promise<any>
    getFiles(options: CF.GetFiles): Promise<any>

    getURL(options: RTDB.GetURL): Promise<any>
    getURL(options: CF.GetURL): Promise<any>

    upload(fileData: any, options: UploadOptions): PromiseLike<any>

    deleteFile(options: RTDB.GetFile): Promise<any>
    deleteFile(options: CF.GetFile): Promise<any>

    getMetadata(options: RTDB.GetMetadata): Promise<any>
    getMetadata(options: CF.GetMetadata): Promise<any>

    updateMetadata(options: RTDB.UpdateMetadata): Promise<any>
    updateMetadata(options: CF.UpdateMetadata): Promise<any>

    /** Some internal methods we do not want to explicitly type publicly */
    [key: string]: any
  }

  export type FlamelinkFactory = (context: App.Context) => Storage.Api
}

export = Storage
