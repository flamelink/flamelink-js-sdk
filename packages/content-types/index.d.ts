import App from '@flamelink/sdk-app-types'

// eslint-disable-next-line no-redeclare
declare namespace Content {
  namespace RTDB {
    interface Get extends App.RTDB.Options {
      schemaKey?: string
      entryId?: string
    }

    interface GetByField extends Get {
      field: string
      value: any
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
      entryId: string
      data: any
    }

    interface Remove extends App.RTDB.Options {
      schemaKey: string
      entryId?: string
    }
  }

  namespace CF {
    interface Get extends App.CF.Options {
      schemaKey?: string
      entryId?: string
    }

    interface GetByField extends Get {
      field: string
      value: any
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
      entryId: string
      data: any
    }

    interface Remove extends App.CF.Options {
      schemaKey: string
      entryId?: string
    }
  }

  export interface Api {
    ref(reference?: string | string[]): any

    getRaw(options: RTDB.Get): Promise<any>
    getRaw(options: CF.Get): Promise<any>

    get(options?: RTDB.Get): Promise<any>
    get(options?: CF.Get): Promise<any>

    getByFieldRaw?(options: RTDB.GetByField): Promise<any>
    getByFieldRaw?(options: CF.GetByField): Promise<any>

    getByField(options: RTDB.GetByField): Promise<any>
    getByField(options: CF.GetByField): Promise<any>

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

  export type FlamelinkFactory = (context: App.Context) => Content.Api
}

export = Content
