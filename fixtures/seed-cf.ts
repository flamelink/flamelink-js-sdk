import getImageSizes from './image-sizes'
import getGlobals from './globals'
import { SeedCF } from './types'
import { getSchema } from './schemas'

export default (): SeedCF => ({
  fl_content: [],
  fl_environments: [],
  fl_files: [],
  fl_folders: [],
  fl_locales: [],
  fl_navigation: [],
  fl_permissions: [],
  fl_schemas: [
    {
      docId: 'EBNiExsNqIJ3n4UKVEYg',
      doc: getSchema({
        dbType: 'cf',
        schemaKey: 'products',
        env: 'production',
        docId: 'EBNiExsNqIJ3n4UKVEYg',
      }),
    },
    {
      docId: 'GxQ6VZnnQOabHNBlLZFE',
      doc: getSchema({
        dbType: 'cf',
        schemaKey: 'productCategory',
        env: 'production',
        docId: 'GxQ6VZnnQOabHNBlLZFE',
      }),
    },
  ],
  fl_settings: [
    {
      docId: 'defaultLocale',
      doc: {},
    },
    {
      docId: 'general',
      doc: {
        _fl_meta_: {
          docId: 'general',
          lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          lastModifiedDate: 'April 5, 2019 at 4:26:42 PM UTC+2',
        },
        defaultPermissionsGroup: {
          type: 'ref',
          val: '/fl_permissions/1',
        },
        id: 'general',
        imageSizes: getImageSizes(),
      },
    },
    {
      docId: 'globals',
      doc: getGlobals('cf'),
    },
  ],
  fl_users: [
    {
      docId: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
      doc: {
        _fl_meta_: {
          docId: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
        },
        displayName: 'JP Erasmus',
        email: 'jperasmus11@gmail.com',
        enabled: 'Yes',
        firstName: 'JP',
        id: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
        lastName: 'Erasmus',
        permissions: {
          type: 'ref',
          val: '/fl_permissions/1',
        },
      },
    },
  ],
})
