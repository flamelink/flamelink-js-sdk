// Type definitions for flamelink
// Project: flamelink-js-sdk
// Definitions by: JP Erasmus <jp@flamelink.io>
/* eslint-disable no-redeclare, @typescript-eslint/no-empty-interface */

import * as AppTypes from '@flamelink/sdk-app-types'
import { Api as ContentApi } from '@flamelink/sdk-content-types'
import { Api as SchemasApi } from '@flamelink/sdk-schemas-types'
import { Api as StorageApi } from '@flamelink/sdk-storage-types'
import { Api as NavigationApi } from '@flamelink/sdk-navigation-types'
import { Api as SettingsApi } from '@flamelink/sdk-settings-types'
import { Api as UsersApi } from '@flamelink/sdk-users-types'

declare function flamelink(config: flamelink.app.Config): flamelink.app.App

// eslint-disable-next-line no-redeclare
declare namespace flamelink {}

declare namespace flamelink.app {
  export type Config = AppTypes.Config

  interface App {
    content: flamelink.content.Content
    schemas: flamelink.schemas.Schemas
    storage: flamelink.storage.Storage
    nav: flamelink.nav.Navigation
    settings: flamelink.settings.Settings
    users: flamelink.users.Users
  }
}

declare namespace flamelink.schemas {
  interface Schemas extends SchemasApi {}
}

declare namespace flamelink.content {
  interface Content extends ContentApi {}
}

declare namespace flamelink.nav {
  interface Navigation extends NavigationApi {}
}

declare namespace flamelink.settings {
  interface Settings extends SettingsApi {}
}

declare namespace flamelink.storage {
  interface Storage extends StorageApi {}
}

declare namespace flamelink.users {
  interface Users extends UsersApi {}
}

// Export for build systems (module loaders)
export = flamelink

// Global export outside of module loader environment
// eslint-disable-next-line no-undef
export as namespace flamelink
