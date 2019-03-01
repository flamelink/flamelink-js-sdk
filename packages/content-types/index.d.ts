import {
  FlamelinkContext,
  OptionsForRTDB,
  OptionsForCF,
  SubscriptionCallback,
  UnsubscribeMethod
} from '@flamelink/sdk-app-types'

// eslint-disable-next-line no-redeclare
declare namespace Content {
  namespace RTDB {
    interface Get extends OptionsForRTDB {
      schemaKey?: string
      entryId?: string
    }

    interface GetByField extends Get {
      field: string
      value: any
    }

    interface Subscribe extends Get {
      callback: SubscriptionCallback
    }

    interface Add extends OptionsForRTDB {
      schemaKey: string
      data: any
    }

    interface Update extends OptionsForRTDB {
      schemaKey: string
      entryId: string
      data: any
    }

    interface Remove extends OptionsForRTDB {
      schemaKey: string
      entryId?: string
    }
  }

  namespace CF {
    interface Get extends OptionsForCF {
      schemaKey?: string
      entryId?: string
    }

    interface GetByField extends Get {
      field: string
      value: any
    }

    interface Subscribe extends Get {
      changeType?: string
      callback: SubscriptionCallback
    }

    interface Add extends OptionsForCF {
      schemaKey: string
      data: any
    }

    interface Update extends OptionsForCF {
      schemaKey: string
      entryId: string
      data: any
    }

    interface Remove extends OptionsForCF {
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

    subscribeRaw(options: RTDB.Subscribe): UnsubscribeMethod
    subscribeRaw(options: CF.Subscribe): UnsubscribeMethod

    subscribe(options?: RTDB.Subscribe): UnsubscribeMethod
    subscribe(options?: CF.Subscribe): UnsubscribeMethod

    add(options: RTDB.Add): Promise<any>
    add(options: CF.Add): Promise<any>

    update(options: RTDB.Update): Promise<any>
    update(options: CF.Update): Promise<any>

    remove(options: RTDB.Remove): Promise<any>
    remove(options: CF.Remove): Promise<any>
  }

  export type FlamelinkFactory = (context: FlamelinkContext) => Content.Api
}

export = Content
