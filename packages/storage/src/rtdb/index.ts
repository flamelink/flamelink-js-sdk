import compose from 'compose-then'
import values from 'lodash/values'
import isPlainObject from 'lodash/isPlainObject'
import find from 'lodash/find'
import get from 'lodash/get'
import set from 'lodash/set'
import resizeImage from 'browser-image-resizer'
import flamelink from '@flamelink/sdk-app'
import { UnsubscribeMethod } from '@flamelink/sdk-app-types'
import {
  FlamelinkStorageFactory,
  StoragePublicApi,
  GetFilesArgsForRTDB,
  ImageSize
} from '@flamelink/sdk-storage-types'
import {
  applyOptionsForRTDB,
  pluckResultFields,
  formatStructure,
  FlamelinkError,
  logWarning
} from '@flamelink/sdk-utils'
import {
  getStorageRefPath,
  getFolderRefPath,
  getFileRefPath,
  getMediaRefPath
} from './helpers'
import { filterFilesByFolderId, getScreenResolution } from '../helpers'
import { DEFAULT_REQUIRED_IMAGE_SIZE } from '../constants'

const factory: FlamelinkStorageFactory = context => {
  const api: StoragePublicApi = {
    /**
     * @description Get the folder ID for a given folder name using an optional fallback folder name
     * @param {string} [folderName='']
     * @param {string} [fallback='Root']
     * @returns {string} folderId
     * @private
     */
    _getFolderId: async ({ folderName = '', fallback = 'Root' }) => {
      const dbService = flamelink._ensureService('database', context)
      const foldersSnapshot = await dbService
        .ref(getFolderRefPath())
        .once('value')
      const folders = foldersSnapshot.val()
      const folder = find(folders, { name: folderName })

      if (!folder) {
        const fallbackFolder = find(folders, { name: fallback }) || {}
        return fallbackFolder.id
      }

      return folder.id
    },

    /**
     * @description Get the folder ID for a given options object. If the ID is given it is simply returned, otherwise it
     * try and deduce it from a given folder name or falling back to the ID for the "Root" directory
     * @param {any} [options={}]
     * @returns {promise} Resolves to the folder ID
     * @private
     */
    _getFolderIdFromOptions: async ({
      folderId,
      folderName,
      folderFallback
    } = {}) => {
      if (folderId) {
        return folderId
      }

      return api._getFolderId({ folderName, fallback: folderFallback })
    },

    /**
     * @description Writes the file meta to the Firebase real-time db. Not intended as a public method.
     * Used internally by the `upload` method.
     * @param {object} [filePayload={}]
     * @returns {promise}
     * @private
     */
    _setFile: filePayload => {
      const payload = Object.assign({}, filePayload, {
        __meta__: {
          createdBy: get(context, 'services.auth.currentUser.uid', 'UNKNOWN'),
          createdDate: new Date().toISOString()
        }
      })

      return api.fileRef(filePayload.id).set(payload)
    },

    /**
     * @description Resizes a given file to the size provided in the options config. Not for public use.
     * User internally by the `upload` method.
     * @param {File} file
     * @param {string} filename
     * @param {object} options
     * @returns {promise}
     * @private
     */
    _createSizedImage: async (file, filename, options = {}) => {
      if (options && (options.path || options.width || options.maxWidth)) {
        const resizedImage = await resizeImage(file, options)
        return api
          .ref(filename, {
            path: options.path,
            width: options.width || options.maxWidth
          })
          .put(resizedImage)
      }
      throw new FlamelinkError(
        `Invalid size object supplied - please refer to https://flamelink.github.io/flamelink-js-sdk/#/storage?id=upload for more details on upload options.\nImage upload for supplied size skipped for file: ${filename}`
      )
    },

    ref: (filename, { ...options }) => {
      if (context.isNodeEnvironment && !context.usesAdminApp) {
        throw new FlamelinkError(`
        The Firebase client-side SDK cannot access the Storage Bucket server-side.
        Please use the admin SDK instead - https://www.npmjs.com/package/firebase-admin

        Instructions here: https://flamelink.github.io/flamelink-js-sdk/#/getting-started?id=usage
        `)
      }

      const storageService = flamelink._ensureService('storage', context)

      // Check if the filename is a URL (contains "://")
      if (/:\/\//.test(filename)) {
        if (context.usesAdminApp) {
          throw new FlamelinkError(
            'Retrieving files from URL is not supported for the admin SDK'
          )
        }
        return storageService.refFromURL(filename)
      }

      return context.usesAdminApp
        ? storageService.bucket().file(getStorageRefPath(filename, options))
        : storageService.ref(getStorageRefPath(filename, options))
    },

    folderRef: folderID => {
      const dbService = flamelink._ensureService('database', context)
      return dbService.ref(getFolderRefPath(folderID))
    },

    fileRef: fileId => {
      const dbService = flamelink._ensureService('database', context)
      return dbService.ref(getFileRefPath(fileId))
    },

    mediaRef: storageKey => {
      const dbService = flamelink._ensureService('database', context)
      return dbService.ref(getMediaRefPath(storageKey))
    },

    getRaw: async ({ storageKey, ...options }) => {
      const filtered = applyOptionsForRTDB(api.mediaRef(storageKey), options)
      return filtered.once(options.event || 'value')
    },

    get: async ({ storageKey, ...options }) => {
      const pluckFields = pluckResultFields(options.fields)
      const snapshot = await api.getRaw({ storageKey, ...options })
      const media = snapshot.val()

      if (storageKey) {
        // Wrapping value to create the correct structure for our field plucking to work
        const wrapValue = { [storageKey]: media }
        return pluckFields(wrapValue)[storageKey]
      }

      return pluckFields(media)
    },

    subscribeRaw: ({ storageKey, callback, ...options }) => {
      const filteredRef = applyOptionsForRTDB(api.mediaRef(storageKey), options)

      filteredRef.on(
        options.event || 'value',
        (snapshot: any) => callback(null, snapshot),
        (err: Error) => callback(err, null)
      )

      const unsubscribe: UnsubscribeMethod = () =>
        filteredRef.off(options.event || 'value')
      return unsubscribe
    },

    subscribe: ({ storageKey, callback, ...options }) => {
      const pluckFields = pluckResultFields(options.fields)

      return api.subscribeRaw({
        storageKey,
        ...options,
        callback: async (err, snapshot) => {
          if (err) {
            return callback(err, null)
          }

          const value = storageKey
            ? { [storageKey]: snapshot.val() }
            : snapshot.val()
          const result = await pluckFields(value)

          return callback(null, storageKey ? result[storageKey] : result)
        }
      })
    },

    getFoldersRaw: ({ ...options }) => {
      return applyOptionsForRTDB(api.folderRef(), options).once(
        options.event || 'value'
      )
    },

    getFolders: async ({ ...options }) => {
      const pluckFields = pluckResultFields(options.fields)
      const structureItems = formatStructure(options.structure, {
        idProperty: 'id',
        parentProperty: 'parentId'
      })
      const snapshot = await api.getFoldersRaw(options)
      return compose(
        pluckFields,
        structureItems,
        values
      )(snapshot.val())
    },

    getFileRaw: async ({ fileId, ...options }) => {
      if (!fileId) {
        throw new FlamelinkError(
          '"storage.getFileRaw()" should be called with at least the file ID'
        )
      }

      return applyOptionsForRTDB(api.fileRef(fileId), options).once(
        options.event || 'value'
      )
    },

    getFile: async ({ fileId, ...options }) => {
      if (!fileId) {
        throw new FlamelinkError(
          '"storage.getFile()" should be called with at least the file ID'
        )
      }
      const pluckFields = pluckResultFields(options.fields)
      const snapshot = await api.getFileRaw({ fileId, ...options })
      // Wrapping value to create the correct structure for our field plucking to work
      const wrapValue = { [fileId]: snapshot.val() }
      const file = await pluckFields(wrapValue)
      return file[fileId]
    },

    getFilesRaw: ({ ...options }) => {
      return applyOptionsForRTDB(api.fileRef(), options).once(
        options.event || 'value'
      )
    },

    getFiles: async ({ ...options }) => {
      const defaultOptions: GetFilesArgsForRTDB = { folderFallback: null }
      const opts = Object.assign(
        defaultOptions,
        options,
        options.mediaType
          ? {
              orderByChild: 'type',
              equalTo: options.mediaType
            }
          : {}
      )
      const folderId = await api._getFolderIdFromOptions(opts)
      const filterFolders = filterFilesByFolderId(folderId)
      const pluckFields = pluckResultFields(opts.fields)
      const snapshot = await api.getFilesRaw(opts)
      return compose(
        pluckFields,
        filterFolders
      )(snapshot.val())
    },

    getURL: async ({ fileId, ...options }) => {
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

      const getImagePathByClosestSize = (minSize: number) => {
        const smartWidth = availableFileSizes
          .map(
            availableSize =>
              Object.assign({}, availableSize, {
                width: parseInt(
                  availableSize.width || availableSize.maxWidth,
                  10
                )
              }),
            []
          )
          .sort((a, b) => a.width - b.width) // sort widths ascending
          .find(availableSize => availableSize.width >= minSize)

        if (smartWidth) {
          storageRefArgs.options = Object.assign(
            storageRefArgs.options,
            smartWidth
          )
        } else {
          logWarning(
            `The provided size (${size}) has been ignored because it did not match any of the given file's available sizes.\nAvailable sizes: ${availableFileSizes
              .map(availableSize => availableSize.width)
              .join(', ')}`
          )
        }
      }

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
              path: size.path
            })
          } else {
            logWarning(
              `The provided path (${
                size.path
              }) has been ignored because it did not match any of the given file's available paths.\nAvailable paths: ${availableFileSizes
                .map(availableSize => availableSize.path)
                .join(', ')}`
            )
          }
        } else if (width && availableFileSizes && availableFileSizes.length) {
          getImagePathByClosestSize(parseInt(width.toString(), 10))
        }
      } else if (
        typeof size === 'string' &&
        availableFileSizes &&
        availableFileSizes.length
      ) {
        // This part is for the special 'device' use case and for the legacy width setting
        const minSize = size === 'device' ? getScreenResolution() : size
        getImagePathByClosestSize(Number(minSize))
      }

      const fileRef = await api.ref(
        storageRefArgs.filename,
        storageRefArgs.options
      )

      if (context.usesAdminApp) {
        const signedUrls = await fileRef.getSignedUrl({
          action: 'read',
          expires: '01-01-2500' // Just expire at some very far time in the future
        })
        return get(signedUrls, '[0]', '')
      }

      return fileRef.getDownloadURL()
    },

    getMetadata: async ({ fileId, ...options }) => {
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

    updateMetadata: async ({ fileId, updates }) => {
      if (!fileId || !updates) {
        throw new FlamelinkError(
          '"storage.updateMetadata()" should be called with the "fileID" and the "updates" object'
        )
      }

      const file = await api.getFile({ fileId })

      if (!file) {
        throw new FlamelinkError(`There is no file for File ID: "${fileId}"`)
      }

      const { file: filename } = file

      return api.ref(filename).updateMetadata(updates)
    },

    deleteFile: async ({ fileId, ...options }) => {
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
          sizes.map(async size => {
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

    upload: async (fileData, options = {}) => {
      if (context.usesAdminApp) {
        throw new FlamelinkError(
          '"storage.upload()" is not currently supported for server-side use.'
        )
      }
      const { sizes: userSizes, overwriteSizes } = options
      const settingsImageSizes = await get(
        context,
        'modules.settings'
      ).getImageSizes()

      if (settingsImageSizes) {
        if (!userSizes && !overwriteSizes) {
          set(options, 'sizes', settingsImageSizes || [])
        } else if (userSizes && userSizes.length && !overwriteSizes) {
          set(options, 'sizes', [...settingsImageSizes, ...userSizes] || [])
        }
      }

      // Ensure image size with width DEFAULT_REQUIRED_IMAGE_SIZE exists
      // Flamelink CMS expects file to reside in `240` folder, so size if only `width: 240` should be passed
      if (
        !options.sizes ||
        ((options.sizes && options.sizes.length === 0) ||
          (Array.isArray(options.sizes) &&
            options.sizes.filter(
              size =>
                (size.width === DEFAULT_REQUIRED_IMAGE_SIZE ||
                  size.maxWidth === DEFAULT_REQUIRED_IMAGE_SIZE) &&
                !size.height &&
                !size.quality
            ).length === 0))
      ) {
        if (Array.isArray(options.sizes)) {
          options.sizes.push({ width: DEFAULT_REQUIRED_IMAGE_SIZE })
        } else {
          set(options, 'sizes', [{ width: DEFAULT_REQUIRED_IMAGE_SIZE }])
        }
      }

      const id = Date.now().toString()
      const metadata = get(options, 'metadata', {})
      const filename =
        (typeof fileData === 'object' && fileData.name) ||
        typeof metadata.name === 'string'
          ? `${id}_${metadata.name || fileData.name}`
          : id
      const storageRef = api.ref(filename, options)
      const updateMethod = typeof fileData === 'string' ? 'putString' : 'put'
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
      const uploadTask = storageRef[updateMethod](...args)
      const snapshot = await uploadTask

      const mediaType = /^image\//.test(get(snapshot, 'metadata.contentType'))
        ? 'images'
        : 'files'
      const filePayload = {
        id,
        file: get(snapshot, 'metadata.name', ''),
        folderId,
        type: mediaType,
        contentType: get(snapshot, 'metadata.contentType', '')
      }

      // If mediaType === 'images', file is resizeable and sizes/widths are set, resize images here
      if (
        mediaType === 'images' &&
        updateMethod === 'put' &&
        Array.isArray(options.sizes)
      ) {
        filePayload.sizes = options.sizes.map(size => {
          const { width, height, quality } = size
          if (
            typeof width !== 'undefined' &&
            typeof height !== 'undefined' &&
            typeof quality !== 'undefined'
          ) {
            return Object.assign({}, size, {
              path: `${width}_${height}_${Math.round(quality * 100)}`
            })
          }
          return size
        })

        await Promise.all(
          filePayload.sizes.map(size =>
            api._createSizedImage(fileData, filename, size)
          )
        )
      }

      // Write to db
      await api._setFile(filePayload)

      return uploadTask
    }
  }

  return api
}

export default factory
