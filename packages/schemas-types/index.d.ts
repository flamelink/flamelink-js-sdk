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
      data: any
    }

    interface Update extends App.RTDB.Options {
      schemaKey: string
      data: any
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
      data: any
    }

    interface Update extends App.CF.Options {
      schemaKey: string
      data: any
    }

    interface Remove extends App.CF.Options {
      schemaKey?: string
    }
  }

  export interface Api {
    ref(reference?: string): any

    getRaw(options: RTDB.Get): Promise<any>
    getRaw(options: CF.Get): Promise<any>

    get(options?: RTDB.Get): Promise<any>
    get(options?: CF.Get): Promise<any>

    getFieldsRaw?(options: RTDB.Get): Promise<any>
    getFieldsRaw?(options: CF.Get): Promise<any>

    getFields(options: RTDB.Get): Promise<any>
    getFields(options: CF.Get): Promise<any>

    subscribeRaw(options: RTDB.Subscribe): App.UnsubscribeMethod
    subscribeRaw(options: CF.Subscribe): App.UnsubscribeMethod

    subscribe(options?: RTDB.Subscribe): App.UnsubscribeMethod
    subscribe(options?: CF.Subscribe): App.UnsubscribeMethod

    subscribeFields(options?: RTDB.Subscribe): App.UnsubscribeMethod
    subscribeFields(options?: CF.Subscribe): App.UnsubscribeMethod

    add(options: RTDB.Add): Promise<any>
    add(options: CF.Add): Promise<any>

    update(options: RTDB.Update): Promise<any>
    update(options: CF.Update): Promise<any>

    remove(options: RTDB.Remove): Promise<any>
    remove(options: CF.Remove): Promise<any>
  }

  export type FlamelinkFactory = (context: App.Context) => Schemas.Api
}

export = Schemas
