import compose from 'compose-then'
import values from 'lodash/values'
import isPlainObject from 'lodash/isPlainObject'
import find from 'lodash/find'
import get from 'lodash/get'
import set from 'lodash/set'
import resizeImage from 'browser-image-resizer'
import flamelink from '@flamelink/sdk-app'
import * as App from '@flamelink/sdk-app-types'
import { UploadTask } from '@firebase/storage-types'
import {
  FlamelinkFactory,
  Api,
  RTDB,
  ImageSize,
  FolderObject,
  FileObject,
} from '@flamelink/sdk-storage-types'
import {
  applyOptionsForRTDB,
  pluckResultFields,
  formatStructure,
  FlamelinkError,
  logWarning,
  getTimestamp,
  getCurrentUser,
  getStorageServiceFactory,
  PromiseEmitter,
  wrap,
  unwrap,
} from '@flamelink/sdk-utils'
import {
  getFolderRefPath,
  getFileRefPath,
  filterFilesByFolderId,
  getScreenResolution,
  getStorageRefPath,
  setImagePathByClosestSize,
  getUploadEvents,
} from './helpers'
import {
  DEFAULT_REQUIRED_IMAGE_SIZE,
  FOLDER_REQUIRED_FIELDS_FOR_STRUCTURING,
} from './constants'

export const factory: FlamelinkFactory = function (context) {
  const api: Api = {
    async _getFolderId({ folderName = 'Root' }) {
      if (!folderName) {
        return null
      }

      const dbService = flamelink._ensureService('database', context)
      const foldersSnapshot = await dbService
        .ref(getFolderRefPath())
        .once('value')
      const folders = foldersSnapshot.val()
      const folder = find(folders, { name: folderName }) as FolderObject

      if (!folder) {
        return folder
      }

      return folder.id
    },

    async _getFolderIdFromOptions(
      { folderId, folderName } = {
        folderId: '',
        folderName: '',
      }
    ) {
      if (folderId) {
        return folderId
      }

      return api._getFolderId({ folderName })
    },

    async _setFile(filePayload: FileObject) {
      const payload = Object.assign({}, filePayload, {
        __meta__: {
          createdBy: getCurrentUser(context),
          createdDate: getTimestamp(context),
        },
      })

      return api.fileRef(filePayload.id).set(payload)
    },

    _createSizedImage(
      fileData: any,
      filename: string,
      options: ImageSize = {}
    ) {
      return new PromiseEmitter(async (resolve, reject, emitter) => {
        if (options && (options.path || options.width || options.maxWidth)) {
          const storage = getStorageServiceFactory(context)

          emitter.emit(api.UploadEvents.RESIZE_IMAGE_STARTED, filename, options)

          const resizedImage = await resizeImage(fileData, options)

          emitter.emit(
            api.UploadEvents.RESIZE_IMAGE_FINISHED,
            filename,
            options
          )

          const ref = api.ref(filename, {
            path: options.path,
            width: options.width || options.maxWidth,
          })

          emitter.emit(
            api.UploadEvents.SIZED_FILE_UPLOAD_STARTED,
            filename,
            options
          )
          const uploadMethod = context.usesAdminApp ? 'upload' : 'put'
          const uploadTask: UploadTask = ref[uploadMethod](resizedImage)

          let unsubscribe

          if (get(storage, 'TaskEvent')) {
            unsubscribe = uploadTask.on(
              storage.TaskEvent.STATE_CHANGED,
              (sizedSnap: any) => {
                emitter.emit(
                  api.UploadEvents.SIZED_FILE_UPLOAD_STATE_CHANGED,
                  sizedSnap,
                  options
                )
              }
            )
          }

          const uploadedImage = await uploadTask

          if (typeof unsubscribe === 'function') {
            unsubscribe()
          }
          emitter.emit(
            api.UploadEvents.SIZED_FILE_UPLOAD_FINISHED,
            filename,
            options
          )

          return resolve(uploadedImage)
        }

        reject(
          new FlamelinkError(
            `Invalid size object supplied - please refer to https://flamelink.github.io/flamelink-js-sdk/#/storage?id=upload for more details on upload options.\nImage upload for supplied size skipped for file: ${filename}`
          )
        )
      })
    },

    ref(filename, { ...options }: ImageSize) {
      if (context.isNodeEnvironment && !context.usesAdminApp) {
        throw new FlamelinkError(
          `
The Firebase client-side SDK cannot access the Storage Bucket server-side.
Please use the admin SDK instead - https://www.npmjs.com/package/firebase-admin

Instructions here: https://flamelink.github.io/flamelink-js-sdk/#/getting-started?id=usage
        `,
          'service-unavailable',
          false
        )
      }

      const storageService = flamelink._ensureService('storage', context)

      // Check if the filename is a URL (contains "://")
      if (/:\/\//.test(filename)) {
        if (context.usesAdminApp) {
          throw new FlamelinkError(
            'Retrieving files from URL is not supported for the admin SDK',
            'service-unavailable',
            false
          )
        }
        return storageService.refFromURL(filename)
      }

      return context.usesAdminApp
        ? storageService
            .bucket()
            .file(getStorageRefPath(filename, options as ImageSize))
        : storageService.ref(getStorageRefPath(filename, options))
    },

    folderRef(folderID) {
      const dbService = flamelink._ensureService('database', context)
      return dbService.ref(getFolderRefPath(folderID))
    },

    fileRef(fileId) {
      const dbService = flamelink._ensureService('database', context)
      return dbService.ref(getFileRefPath(fileId))
    },

    async getFoldersRaw({ ...options }: App.RTDB.Options) {
      return applyOptionsForRTDB(api.folderRef(), options).once(
        options.event || 'value'
      )
    },

    async getFolders({ fields, structure, ...options }: App.RTDB.Options) {
      const fieldsToPluck = Array.isArray(fields)
        ? Array.from(
            new Set(FOLDER_REQUIRED_FIELDS_FOR_STRUCTURING.concat(fields))
          )
        : fields
      const pluckFields = pluckResultFields(fieldsToPluck)
      const structureItems = formatStructure(structure, {
        idProperty: 'id',
        parentProperty: 'parentId',
      })
      const snapshot = await api.getFoldersRaw(options)

      if (structure === 'nested' || structure === 'tree') {
        return compose(pluckFields, structureItems, values)(snapshot.val())
      }

      return pluckFields(snapshot.val())
    },

    async getFileRaw({ fileId, ...options }: RTDB.GetFile) {
      if (!fileId) {
        throw new FlamelinkError(
          '"storage.getFileRaw()" should be called with at least the file ID'
        )
      }

      return applyOptionsForRTDB(api.fileRef(fileId), options).once(
        options.event || 'value'
      )
    },

    async getFile({ fileId, ...options }: RTDB.GetFile) {
      if (!fileId) {
        throw new FlamelinkError(
          '"storage.getFile()" should be called with at least the file ID'
        )
      }
      const pluckFields = pluckResultFields(options.fields)
      const snapshot = await api.getFileRaw({ fileId, ...options })

      return await compose(
        unwrap(fileId),
        pluckFields,
        wrap(fileId)
      )(snapshot.val())
    },

    async getFilesRaw({ ...options }: RTDB.GetFiles) {
      return applyOptionsForRTDB(api.fileRef(), options).once(
        options.event || 'value'
      )
    },

    async getFiles({ ...options }: RTDB.GetFiles) {
      const defaultOptions: RTDB.GetFiles = {}
      const opts = Object.assign(
        defaultOptions,
        options,
        options.mediaType
          ? {
              orderByChild: 'type',
              equalTo: options.mediaType,
            }
          : {}
      )
      const folderId = await api._getFolderIdFromOptions(opts)
      const filterFolders = filterFilesByFolderId(folderId)
      const pluckFields = pluckResultFields(opts.fields)
      const snapshot = await api.getFilesRaw(opts)

      return compose(pluckFields, filterFolders)(snapshot.val())
    },

    async getURL({ fileId, ...options }: RTDB.GetURL) {
      if (!fileId) {
        throw new FlamelinkError(
          '"storage.getURL()" should be called with at least the file ID'
        )
      }

      const { size } = options
      const file = await api.getFile({ fileId, ...options })

      if (!file) {
        return file
      }

      const { file: filename, sizes: availableFileSizes } = file
      const storageRefArgs = { filename, options: {} }

      if (isPlainObject(size)) {
        const { width, height, quality } = size as ImageSize

        if (width && height && quality) {
          size.path = `${width}_${height}_${Math.round(
            parseFloat(quality.toString()) * 100
          )}`
        }

        // For images with `path` value
        if (size.path && get(availableFileSizes, '[0].path')) {
          if (
            availableFileSizes.find(
              ({ path: filePath }) => filePath === size.path
            )
          ) {
            storageRefArgs.options = Object.assign(storageRefArgs.options, {
              path: size.path,
            })
          } else {
            logWarning(
              `The provided path (${
                size.path
              }) has been ignored because it did not match any of the given file's available paths.\nAvailable paths: ${availableFileSizes
                .map((availableSize) => availableSize.path)
                .join(', ')}`
            )
          }
        } else if (width && availableFileSizes && availableFileSizes.length) {
          setImagePathByClosestSize(
            storageRefArgs,
            availableFileSizes,
            parseInt(width.toString(), 10)
          )
        }
      } else if (
        typeof size === 'string' &&
        availableFileSizes &&
        availableFileSizes.length
      ) {
        // This part is for the special 'device' use case and for the legacy width setting
        const minSize = size === 'device' ? getScreenResolution() : size
        setImagePathByClosestSize(
          storageRefArgs,
          availableFileSizes,
          Number(minSize)
        )
      }

      const fileRef = await api.ref(
        storageRefArgs.filename,
        storageRefArgs.options
      )

      if (context.usesAdminApp) {
        const signedUrls = await fileRef.getSignedUrl({
          action: 'read',
          expires: '01-01-2500', // Just expire at some very far time in the future
        })
        return get(signedUrls, '[0]', '')
      }

      return fileRef.getDownloadURL()
    },

    async getMetadata({ fileId, ...options }: RTDB.GetMetadata) {
      if (!fileId) {
        throw new FlamelinkError(
          '"storage.getMetadata()" should be called with at least the file ID'
        )
      }

      const file = await api.getFile({ fileId, ...options })

      if (!file) {
        throw new FlamelinkError(`There is no file for File ID: "${fileId}"`)
      }

      const { file: filename } = file

      return api.ref(filename).getMetadata()
    },

    async updateMetadata({ fileId, data }: RTDB.UpdateMetadata) {
      if (!fileId || !data) {
        throw new FlamelinkError(
          '"storage.updateMetadata()" should be called with the "fileID" and the "data" object'
        )
      }

      const file = await api.getFile({ fileId })

      if (!file) {
        throw new FlamelinkError(`There is no file for File ID: "${fileId}"`)
      }

      const { file: filename } = file

      return api.ref(filename).updateMetadata(data)
    },

    async deleteFile({ fileId, ...options }: RTDB.GetFile) {
      if (context.usesAdminApp) {
        throw new FlamelinkError(
          '"storage.deleteFile()" is not currently supported for server-side use.'
        )
      }

      if (!fileId) {
        throw new FlamelinkError(
          '"storage.deleteFile()" should be called with at least the file ID'
        )
      }

      const file = await api.getFile({ fileId, ...options })

      if (!file) {
        return file
      }

      const { file: filename, sizes } = file
      const storageRef = api.ref(filename)

      // Delete original file from storage bucket
      await storageRef.delete()

      // If sizes are set, delete all the resized images here
      if (Array.isArray(sizes)) {
        await Promise.all(
          sizes.map(async (size) => {
            const width = size.width || size.maxWidth
            const { path } = size

            if (!width && !path) {
              return Promise.resolve()
            }

            return api.ref(filename, { width, path }).delete()
          })
        )
      }

      // Delete file entry from the real-time db
      return api.fileRef(fileId).remove()
    },

    upload(fileData, options = {}) {
      return new PromiseEmitter(
        async (resolve, reject, emitter): Promise<FileObject> => {
          try {
            const storage = getStorageServiceFactory(context)
            emitter.emit(api.UploadEvents.START)
            const { sizes: userSizes, overwriteSizes } = options
            const settingsImageSizes = await get(context, 'modules.settings', {
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              getImageSizes() {},
            }).getImageSizes()

            if (settingsImageSizes) {
              if (!userSizes && !overwriteSizes) {
                set(options, 'sizes', settingsImageSizes || [])
              } else if (userSizes && userSizes.length && !overwriteSizes) {
                set(
                  options,
                  'sizes',
                  [...settingsImageSizes, ...userSizes] || []
                )
              }
            }

            // Ensure image size with width DEFAULT_REQUIRED_IMAGE_SIZE exists
            // Flamelink CMS expects file to reside in `240` folder, so size if only `width: 240` should be passed
            if (
              !options.sizes ||
              (options.sizes && options.sizes.length === 0) ||
              (Array.isArray(options.sizes) &&
                options.sizes.filter(
                  (size) =>
                    (size.width === DEFAULT_REQUIRED_IMAGE_SIZE ||
                      size.maxWidth === DEFAULT_REQUIRED_IMAGE_SIZE) &&
                    !size.height &&
                    !size.quality
                ).length === 0)
            ) {
              if (Array.isArray(options.sizes)) {
                options.sizes.push({ width: DEFAULT_REQUIRED_IMAGE_SIZE })
              } else {
                set(options, 'sizes', [{ width: DEFAULT_REQUIRED_IMAGE_SIZE }])
              }
            }

            const id = Date.now().toString()
            const metadata = get(options, 'metadata', {} as any)
            const filename =
              (typeof fileData === 'object' && fileData.name) ||
              typeof metadata.name === 'string'
                ? `${id}_${metadata.name || fileData.name}`
                : id
            const storageRef = api.ref(filename, options as ImageSize)
            const updateMethod = context.usesAdminApp
              ? 'upload'
              : typeof fileData === 'string'
              ? 'putString'
              : 'put'
            const args = [fileData]

            let folderId = await api._getFolderIdFromOptions(options)

            if (typeof folderId === 'number') {
              folderId = folderId.toString()
            }

            set(options, 'metadata.customMetadata.flamelinkFileId', id)
            set(options, 'metadata.customMetadata.flamelinkFolderId', folderId)
            args.push(options.metadata)

            // TODO: Test and verify how the Firebase SDK handles string uploads with encoding and metadata
            // Is it the second argument then or should it be passed along with the metadata object?
            if (updateMethod === 'putString' && options.stringEncoding) {
              args.splice(1, 0, options.stringEncoding)
            }

            // Upload original file to storage bucket
            const uploadTask: UploadTask = storageRef[updateMethod](...args)
            emitter.emit(api.UploadEvents.MAIN_FILE_UPLOAD_STARTED)

            let mainUploadTaskUnsubscribe

            if (get(storage, 'TaskEvent')) {
              mainUploadTaskUnsubscribe = uploadTask.on(
                storage.TaskEvent.STATE_CHANGED,
                (snap) => {
                  emitter.emit(
                    api.UploadEvents.MAIN_FILE_UPLOAD_STATE_CHANGED,
                    snap
                  )
                }
              )
            }

            const snapshot = await uploadTask

            if (typeof mainUploadTaskUnsubscribe === 'function') {
              mainUploadTaskUnsubscribe()
            }

            emitter.emit(api.UploadEvents.MAIN_FILE_UPLOAD_FINISHED)

            const mediaType = /^image\//.test(
              get(snapshot, 'metadata.contentType')
            )
              ? 'images'
              : 'files'
            const filePayload: FileObject = {
              id,
              file: get(snapshot, 'metadata.name', ''),
              folderId: api.folderRef(folderId),
              type: mediaType,
              contentType: get(snapshot, 'metadata.contentType', ''),
            }

            // If mediaType === 'images', file is resizeable and sizes/widths are set, resize images here
            if (
              mediaType === 'images' &&
              updateMethod === 'put' &&
              Array.isArray(options.sizes)
            ) {
              emitter.emit(api.UploadEvents.SIZED_FILES_UPLOAD_STARTED)
              filePayload.sizes = options.sizes.map((size) => {
                const { width, height, quality } = size
                if (width && height && quality) {
                  return Object.assign({}, size, {
                    path: `${width}_${height}_${Math.round(
                      parseFloat(quality.toString()) * 100
                    )}`,
                  })
                }
                return size
              })

              await Promise.all(
                filePayload.sizes.map(async (size) => {
                  const sizedPromiseEmitter: PromiseEmitter = api._createSizedImage(
                    fileData,
                    filename,
                    size
                  )

                  const unsubscribe = sizedPromiseEmitter.on(
                    '*',
                    (eventName, ...args) => {
                      emitter.emit(eventName, ...args)
                    }
                  )

                  await sizedPromiseEmitter
                  unsubscribe()
                  return
                })
              )
              emitter.emit(api.UploadEvents.SIZED_FILES_UPLOAD_FINISHED)
            }

            // Write to db
            emitter.emit(api.UploadEvents.DB_PERSIST_STARTED)
            await api._setFile(filePayload)
            emitter.emit(api.UploadEvents.DB_PERSIST_FINISHED)

            emitter.emit(api.UploadEvents.SUCCESS, filePayload)
            return resolve(filePayload)
          } catch (error) {
            emitter.emit(api.UploadEvents.FAILURE, error)
            reject(error)
          }
        }
      )
    },

    get UploadEvents() {
      return getUploadEvents(getStorageServiceFactory(context))
    },
  }

  return api
}

export const register: App.SetupModule = (context: App.Context) => {
  if (context.dbType === 'rtdb') {
    return factory(context)
  }

  return null
}

flamelink._registerModule('storage', register)
