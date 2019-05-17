import * as App from '@flamelink/sdk-app-types'

// eslint-disable-next-line no-redeclare
declare namespace Settings {
  namespace RTDB {
    interface Get extends App.RTDB.Options {
      settingsKey?: string
    }

    interface Subscribe extends Get {
      callback: App.SubscriptionCallback
    }
  }

  namespace CF {
    interface Get extends App.CF.Options {
      settingsKey?: string
    }

    interface Subscribe extends Get {
      changeType?: string
      callback: App.SubscriptionCallback
    }
  }

  export interface Api {
    ref?(reference: string): any

    getRaw(options: RTDB.Get): Promise<any>
    getRaw(options: CF.Get): Promise<any>

    get(options?: RTDB.Get): Promise<any>
    get(options?: CF.Get): Promise<any>

    setEnvironment(env: string): Promise<string>

    getEnvironment(): Promise<string>

    setLocale(locale: string): Promise<string>

    getLocale(): Promise<string>

    getAvailableLocales(): Promise<any>

    getGlobals(): Promise<any>

    getImageSizes(): Promise<any>

    getDefaultPermissionsGroup(): Promise<any>

    subscribeRaw(options: RTDB.Subscribe): App.UnsubscribeMethod
    subscribeRaw(options: CF.Subscribe): App.UnsubscribeMethod

    subscribe(options?: RTDB.Subscribe): App.UnsubscribeMethod
    subscribe(options?: CF.Subscribe): App.UnsubscribeMethod

    subscribeGlobals(options?: RTDB.Subscribe): App.UnsubscribeMethod
    subscribeGlobals(options?: CF.Subscribe): App.UnsubscribeMethod

    subscribeImageSizes(options?: RTDB.Subscribe): App.UnsubscribeMethod
    subscribeImageSizes(options?: CF.Subscribe): App.UnsubscribeMethod

    subscribeDefaultPermissionsGroup(
      options?: RTDB.Subscribe
    ): App.UnsubscribeMethod
    subscribeDefaultPermissionsGroup(
      options?: CF.Subscribe
    ): App.UnsubscribeMethod
  }

  export type FlamelinkFactory = (context: App.Context) => Settings.Api
}

export = Settings
