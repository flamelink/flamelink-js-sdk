import * as App from '@flamelink/sdk-app-types'

// eslint-disable-next-line no-redeclare
declare namespace Schemas {
  namespace RTDB {
    interface Get extends App.RTDB.Options {
      schemaKey?: string
    }

    interface Subscribe extends Get {
      callback: App.SubscriptionCallback
    }

    interface Add extends App.RTDB.Options {
      schemaKey: string
      data: Partial<SchemaRtdb>
    }

    interface Update extends App.RTDB.Options {
      schemaKey: string
      data: Partial<SchemaRtdb>
    }

    interface Remove extends App.RTDB.Options {
      schemaKey?: string
    }
  }

  namespace CF {
    interface Get extends App.CF.Options {
      schemaKey?: string
    }

    interface Subscribe extends Get {
      changeType?: string
      callback: App.SubscriptionCallback
    }

    interface Add extends App.CF.Options {
      schemaKey: string
      data: Partial<SchemaCf>
    }

    interface Update extends App.CF.Options {
      schemaKey: string
      data: Partial<SchemaCf>
    }

    interface Remove extends App.CF.Options {
      schemaKey?: string
    }
  }

  export type SchemaFieldType =
    | 'autocomplete'
    | 'boolean'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'fieldset'
    | 'linked-text'
    | 'location'
    | 'markdown-editor'
    | 'media'
    | 'number'
    | 'password'
    | 'radio'
    | 'repeater'
    | 'select'
    | 'select-relational'
    | 'tag'
    | 'text'
    | 'textarea'
    | 'tree-relational'
    | 'wysiwyg'
    | 'wysiwyg-cke'

  export interface FieldGridColumns {
    xs: number
    sm: number
    md: number
    lg: number
  }

  export interface FieldConstraint {
    rule: string
    ruleValue: unknown
    uniqueKey?: string
  }

  export interface FieldOption {
    label: string
    value: string
    uniqueKey?: string
  }

  export interface SchemaField {
    constraints?: FieldConstraint[]
    defaultValue?: string
    description?: string
    fieldSeparator?: string
    gridColumns?: FieldGridColumns
    hidden?: boolean
    id: number | string
    key: string
    limit?: number
    mediaTypes?: string[]
    multiple?: boolean
    options?: FieldOption[]
    relation?: string
    relationalFieldsToShow?: string[]
    show: boolean
    title: string
    type: SchemaFieldType
  }

  export type SchemaFields = SchemaField[]

  export type SchemaType = 'single' | 'collection' | 'form'

  interface RtdbSchemaMetadata {
    createdBy?: string
    createdDate?: string
    lastModifiedBy?: string
    lastModifiedDate?: string
  }

  interface CfSchemaMetadata {
    createdBy?: string
    createdDate?: App.FixMe
    docId: string
    env: string
    fl_id: string
    lastModifiedBy?: string
    lastModifiedDate?: App.FixMe
  }

  export interface SchemaBase {
    icon?: string
    id: string
    description?: string
    enabled: boolean
    fields: SchemaFields
    group?: string
    sortable?: boolean
    title: string
    type: SchemaType
    workflow?: string
  }

  export interface SchemaRtdb extends SchemaBase {
    __meta__: RtdbSchemaMetadata
  }

  export interface SchemaCf extends SchemaBase {
    _fl_meta_: CfSchemaMetadata
  }

  export type Schema = SchemaRtdb | SchemaCf

  export interface Api {
    ref(reference?: string): App.FixMe

    getRaw(options: RTDB.Get): Promise<App.FixMe>
    getRaw(options: CF.Get): Promise<App.FixMe>

    get(options?: RTDB.Get): Promise<App.FixMe>
    get(options?: CF.Get): Promise<App.FixMe>

    getFieldsRaw?(options: RTDB.Get): Promise<App.FixMe>
    getFieldsRaw?(options: CF.Get): Promise<App.FixMe>

    getFields(options: RTDB.Get): Promise<App.FixMe>
    getFields(options: CF.Get): Promise<App.FixMe>

    subscribeRaw(options: RTDB.Subscribe): App.UnsubscribeMethod
    subscribeRaw(options: CF.Subscribe): App.UnsubscribeMethod

    subscribe(options?: RTDB.Subscribe): App.UnsubscribeMethod
    subscribe(options?: CF.Subscribe): App.UnsubscribeMethod

    subscribeFields(options?: RTDB.Subscribe): App.UnsubscribeMethod
    subscribeFields(options?: CF.Subscribe): App.UnsubscribeMethod

    add(options: RTDB.Add): Promise<Partial<SchemaRtdb>>
    add(options: CF.Add): Promise<Partial<SchemaCf>>

    update(options: RTDB.Update): Promise<Partial<SchemaRtdb>>
    update(options: CF.Update): Promise<Partial<SchemaCf>>

    remove(options: RTDB.Remove): Promise<App.FixMe>
    remove(options: CF.Remove): Promise<App.FixMe>
  }

  export type FlamelinkFactory = (context: App.Context) => Schemas.Api
}

export = Schemas
