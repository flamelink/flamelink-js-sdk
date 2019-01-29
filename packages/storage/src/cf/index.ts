import { FlamelinkStorageFactory } from '@flamelink/sdk-storage-types'

const factory: FlamelinkStorageFactory = context => {
  console.log('storage from cf', context)

  return {
    upload: () => {},
    getFolders: () => {},
    getFiles: () => {},
    getFile: () => {},
    getURL: () => {},
    deleteFile: () => {},
    getMetadata: () => {},
    updateMetadata: () => {},
    ref: () => {}
  }
}

export default factory
