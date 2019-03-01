import App from '@flamelink/sdk-app-types'

export const PUBLIC_MODULES: App.ModuleName[] = [
  'content',
  'schemas',
  'storage',
  'nav',
  'settings',
  'users'
]

export const DEFAULT_ENVIRONMENT = 'production'
export const DEFAULT_LOCALE = 'en-US'
export const DEFAULT_DB_TYPE = 'rtdb'
