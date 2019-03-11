import App from '@flamelink/sdk-app-types'

// eslint-disable-next-line no-redeclare
declare namespace Users {
  namespace RTDB {
    interface Get extends App.RTDB.Options {
      uid?: string
    }

    interface Subscribe extends Get {
      callback: App.SubscriptionCallback
    }

    interface Add extends App.RTDB.Options {
      uid: string
      data: any
    }

    interface Update extends App.RTDB.Options {
      uid: string
      data: any
    }

    interface Remove extends App.RTDB.Options {
      uid?: string
    }
  }

  namespace CF {
    interface Get extends App.CF.Options {
      uid?: string
    }

    interface Subscribe extends Get {
      changeType?: string
      callback: App.SubscriptionCallback
    }

    interface Add extends App.CF.Options {
      uid: string
      data: any
    }

    interface Update extends App.CF.Options {
      uid: string
      data: any
    }

    interface Remove extends App.CF.Options {
      uid?: string
    }
  }

  export interface Api {
    _getPermissionsRef?(permission?: string): any

    ref(uid?: string): any

    getRaw(options?: RTDB.Get): Promise<any>
    getRaw(options?: CF.Get): Promise<any>

    get(options?: RTDB.Get): Promise<any>
    get(options?: CF.Get): Promise<any>

    subscribeRaw(options: RTDB.Subscribe): App.UnsubscribeMethod
    subscribeRaw(options: CF.Subscribe): App.UnsubscribeMethod

    subscribe(options?: RTDB.Subscribe): App.UnsubscribeMethod
    subscribe(options?: CF.Subscribe): App.UnsubscribeMethod

    addToDB(options: RTDB.Add): Promise<any>
    addToDB(options: CF.Add): Promise<any>

    updateInDB(options: RTDB.Update): Promise<any>
    updateInDB(options: CF.Update): Promise<any>

    removeFromDB(options: RTDB.Remove): Promise<any>
    removeFromDB(options: CF.Remove): Promise<any>
  }

  export type FlamelinkFactory = (context: App.Context) => Users.Api
}

export = Users
