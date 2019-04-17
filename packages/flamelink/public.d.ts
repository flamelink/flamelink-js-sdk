// Type definitions for flamelink
// Project: flamelink-js-sdk
// Definitions by: JP Erasmus <jp@flamelink.io>

import * as AppTypes from '@flamelink/sdk-app-types'
import * as Content from '@flamelink/sdk-content-types'
import * as Schemas from '@flamelink/sdk-schemas-types'
import * as Storage from '@flamelink/sdk-storage-types'
import * as Navigation from '@flamelink/sdk-navigation-types'
import * as Settings from '@flamelink/sdk-settings-types'
import * as Users from '@flamelink/sdk-users-types'

declare function flamelink(config: flamelink.Config): flamelink.App

// eslint-disable-next-line no-redeclare
declare namespace flamelink {
  export type Config = AppTypes.Config

  export interface App {
    content: Content.Api
    schemas: Schemas.Api
    storage: Storage.Api
    nav: Navigation.Api
    settings: Settings.Api
    users: Users.Api
  }
}

// Global export outside of module loader environment
// eslint-disable-next-line no-undef
export as namespace flamelink

// Export for build systems (module loaders)
export = flamelink
