import getImageSizes from './image-sizes'
import getGlobals from './globals'

interface SeedCF {
  fl_content: any[]
  fl_environments: any[]
  fl_files: any[]
  fl_folders: any[]
  fl_locales: any[]
  fl_navigation: any[]
  fl_permissions: any[]
  fl_schemas: any[]
  fl_settings: any[]
  fl_users: any[]
}

export default (): SeedCF => ({
  fl_content: [],
  fl_environments: [],
  fl_files: [],
  fl_folders: [],
  fl_locales: [],
  fl_navigation: [],
  fl_permissions: [],
  fl_schemas: [],
  fl_settings: [
    {
      docId: 'defaultLocale',
      doc: {}
    },
    {
      docId: 'general',
      doc: {
        _fl_meta_: {
          docId: 'general',
          lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          lastModifiedDate: 'April 5, 2019 at 4:26:42 PM UTC+2'
        },
        defaultPermissionsGroup: {
          type: 'ref',
          val: '/fl_permissions/1'
        },
        id: 'general',
        imageSizes: getImageSizes()
      }
    },
    {
      docId: 'globals',
      doc: getGlobals('cf')
    }
  ],
  fl_users: [
    {
      docId: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
      doc: {
        _fl_meta_: {
          docId: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2'
        },
        displayName: 'JP Erasmus',
        email: 'jperasmus11@gmail.com',
        enabled: 'Yes',
        firstName: 'JP',
        id: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
        lastName: 'Erasmus',
        permissions: {
          type: 'ref',
          val: '/fl_permissions/1'
        }
      }
    }
  ]
})
