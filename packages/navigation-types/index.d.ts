import * as App from '@flamelink/sdk-app-types'

// eslint-disable-next-line no-redeclare
declare namespace Navigation {
  namespace RTDB {
    interface Get extends App.RTDB.Options {
      navigationKey?: string
      structure?: string
    }

    interface Subscribe extends Get {
      callback: App.SubscriptionCallback
    }

    interface Add extends App.RTDB.Options {
      navigationKey: string
      data: any
    }

    interface Update extends App.RTDB.Options {
      navigationKey: string
      data: any
    }

    interface Remove extends App.RTDB.Options {
      navigationKey?: string
    }
  }

  namespace CF {
    interface Get extends App.CF.Options {
      navigationKey?: string
      structure?: string
    }

    interface Subscribe extends Get {
      changeType?: string
      callback: App.SubscriptionCallback
    }

    interface Add extends App.CF.Options {
      navigationKey: string
      data: any
    }

    interface Update extends App.CF.Options {
      navigationKey: string
      data: any
    }

    interface Remove extends App.CF.Options {
      navigationKey?: string
    }
  }

  export interface Api {
    ref(reference?: string | string[]): any

    getRaw(options: RTDB.Get): Promise<any>
    getRaw(options: CF.Get): Promise<any>

    get(options?: RTDB.Get): Promise<any>
    get(options?: CF.Get): Promise<any>

    getItemsRaw?(options: RTDB.Get): Promise<any>
    getItemsRaw?(options: CF.Get): Promise<any>

    getItems(options: RTDB.Get): Promise<any>
    getItems(options: CF.Get): Promise<any>

    subscribeRaw(options: RTDB.Subscribe): App.UnsubscribeMethod
    subscribeRaw(options: CF.Subscribe): App.UnsubscribeMethod

    subscribe(options?: RTDB.Subscribe): App.UnsubscribeMethod
    subscribe(options?: CF.Subscribe): App.UnsubscribeMethod

    add(options: RTDB.Add): Promise<any>
    add(options: CF.Add): Promise<any>

    update(options: RTDB.Update): Promise<any>
    update(options: CF.Update): Promise<any>

    remove(options: RTDB.Remove): Promise<any>
    remove(options: CF.Remove): Promise<any>
  }

  export type FlamelinkFactory = (context: App.Context) => Navigation.Api
}

export = Navigation
