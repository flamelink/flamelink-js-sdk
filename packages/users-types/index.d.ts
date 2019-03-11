import App from '@flamelink/sdk-app-types'

// eslint-disable-next-line no-redeclare
declare namespace Users {
  namespace RTDB {
    interface Get extends App.RTDB.Options {
      uid?: string
      structure?: string
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
      structure?: string
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
    get(): any
  }

  export type FlamelinkFactory = (context: App.Context) => Users.Api
}

export = Users
