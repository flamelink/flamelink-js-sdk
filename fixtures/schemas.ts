import { Schema, Schemas, GetSchemaArgs } from './types'

const getProducts = ({
  dbType,
  env,
  docId,
  schemaKey
}: GetSchemaArgs): Schema => ({
  ...(dbType === 'cf'
    ? {
        _fl_meta_: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: {
            nanoseconds: 609000000,
            seconds: 1554974072
          },
          docId: docId || 'products',
          env: env || 'production',
          fl_id: schemaKey || 'products',
          lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          lastModifiedDate: {
            nanoseconds: 609000000,
            seconds: 1554974072
          }
        }
      }
    : {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2018-05-27T11:11:04.813Z',
          lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          lastModifiedDate: '2019-01-23T18:26:40.923Z'
        }
      }),
  description: 'Products',
  enabled: true,
  fields: [
    {
      constraints: [
        {
          rule: 'presence',
          ruleValue: {
            allowEmpty: false,
            message: 'Please provide a name for the product'
          },
          uniqueKey: 'H1_HfGu1m'
        }
      ],
      defaultValue: '',
      description: 'Product Name',
      gridColumns: {
        lg: 6,
        md: 12,
        sm: 12,
        xs: 12
      },
      id: 1527419441379,
      key: 'name',
      show: true,
      title: 'Name',
      type: 'text'
    },
    {
      constraints: [
        {
          rule: 'presence',
          ruleValue: {
            allowEmpty: true,
            message: 'Please select a provider'
          },
          uniqueKey: 'r1tLNwJX7'
        }
      ],
      description: 'Service Provider for Product',
      gridColumns: {
        lg: 3,
        md: 3,
        sm: 12,
        xs: 12
      },
      id: 1531044854516,
      key: 'provider',
      multiple: false,
      options: [
        {
          label: 'Amazon',
          uniqueKey: 'Hym4EDyQQ',
          value: 'amazon'
        },
        {
          label: 'Google',
          uniqueKey: 'BJWSEwkXm',
          value: 'google'
        }
      ],
      show: true,
      title: 'Provider',
      type: 'select'
    },
    {
      constraints: [
        {
          rule: 'presence',
          ruleValue: {
            allowEmpty: false,
            message: 'Please select a category'
          },
          uniqueKey: 'B1n0WIOyQ'
        }
      ],
      description: '',
      fieldSeparator: '-',
      gridColumns: {
        lg: 6,
        md: 6,
        sm: 12,
        xs: 12
      },
      hidden: false,
      id: 1527435664316,
      key: 'category',
      multiple: false,
      relation: 'productCategory',
      relationalFieldsToShow: ['name'],
      show: true,
      title: 'Product Category',
      type: 'select-relational'
    },
    {
      description: 'Product Images',
      gridColumns: {
        lg: 3,
        md: 3,
        sm: 12,
        xs: 12
      },
      id: 1542622420490,
      key: 'images',
      limit: 10,
      mediaTypes: ['images'],
      show: false,
      title: 'Images',
      type: 'media'
    },
    {
      defaultValue: '',
      description: '',
      gridColumns: {
        lg: 12,
        md: 12,
        sm: 12,
        xs: 12
      },
      hidden: false,
      id: 1542622300649,
      key: 'description',
      show: false,
      title: 'Description',
      type: 'wysiwyg-cke'
    },
    {
      defaultValue: '',
      description: '',
      gridColumns: {
        lg: 3,
        md: 3,
        sm: 3,
        xs: 9
      },
      id: 1541691889255,
      key: 'price',
      show: false,
      title: 'Price',
      type: 'number'
    }
  ],
  group: 'Group Name',
  icon: '',
  id: 'products',
  sortable: true,
  title: 'products',
  type: 'collection'
})

const getProductCategory = ({
  dbType,
  docId,
  env,
  schemaKey
}: GetSchemaArgs): Schema => ({
  ...(dbType === 'cf'
    ? {
        _fl_meta_: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: {
            nanoseconds: 609000000,
            seconds: 1554974072
          },
          docId: docId || 'productCategory',
          env: env || 'production',
          fl_id: schemaKey || 'productCategory',
          lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          lastModifiedDate: {
            nanoseconds: 609000000,
            seconds: 1554974072
          }
        }
      }
    : {
        __meta__: {
          createdBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          createdDate: '2018-05-27T11:10:08.894Z',
          lastModifiedBy: 'LKJcOW4CiwS8pijpqmhQcDl9TvX2',
          lastModifiedDate: '2018-12-30T13:28:21.645Z'
        }
      }),
  description: 'Product Categories',
  enabled: true,
  fields: [
    {
      defaultValue: '',
      description: 'Category Name',
      gridColumns: {
        lg: 6,
        md: 12,
        sm: 12,
        xs: 12
      },
      id: 1527419392376,
      key: 'name',
      show: false,
      title: 'Name',
      type: 'text'
    }
  ],
  group: 'Group Name',
  icon: '',
  id: 'productCategory',
  sortable: true,
  title: 'Product Category',
  type: 'collection'
})

const getSchemas = (args: GetSchemaArgs): Schemas => ({
  products: getProducts(args),
  productCategory: getProductCategory(args)
})

export const getAllSchemas = (args: GetSchemaArgs) => getSchemas(args)

export const getSchema = (args: GetSchemaArgs): Schema =>
  getSchemas(args)[args.schemaKey]
