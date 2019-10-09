export interface Globals {
  __meta__?: any
  _fl_meta_?: any
  adminEmail: string
  dateFormat: string
  id: string
  siteTitle: string
  tagline: string
  timeFormat: string
  timezone: string
  url: string
}

export interface ImageSize {
  height: number
  quality: number
  width: number
  uniqueKey?: string
}

export interface GridColumns {
  lg: number
  md: number
  sm: number
  xs: number
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
  description: string
  gridColumns: GridColumns
  id: number
  key: string
  show: boolean
  multiple?: boolean
  hidden?: boolean
  title: string
  type: string
  options?: FieldOption[]
  relationalFieldsToShow?: string[]
  mediaTypes?: string[]
  fieldSeparator?: string
  relation?: string
  limit?: number
}

export interface GetSchemaArgs {
  dbType: 'rtdb' | 'cf'
  schemaKey?: string
  env?: string
  docId?: string
}

export interface Schema {
  __meta__?: any
  title: string
  description: string
  type: 'collection' | 'single' | 'form'
  enabled: boolean
  sortable: boolean
  fields: SchemaField[]
  group: string
  icon: string
  id: string
}

export interface Schemas {
  [key: string]: Schema
}

export interface RTDBMeta {
  createdBy: string
  createdDate: string
  lastModifiedBy?: string
  lastModifiedDate?: string
}

export interface Media {
  files: any
  folders: any
}

export interface PermissionGroup {
  __meta__?: RTDBMeta
  id: string | number
  name: string
  content: any
  environments: any
  media: any
  navigation: any
  permissions: any
  schemas: any
  settings: any
  users: any
}

export interface Permissions {
  [key: string]: PermissionGroup
}

export interface Settings {
  backups: any
  defaultLocale: any
  locales: any
  environments: any
  general: any
  globals: any
}

export interface SeedRTDB {
  environments: any
  media: Media
  permissions: Permissions
  settings: Settings
  users: any
}

export interface SeedCF {
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
