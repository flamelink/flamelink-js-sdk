import * as App from '@flamelink/sdk-app-types'

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
      entryId?: string
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
      entryId?: string
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
    ref(
      reference?: string | string[],
      options?: App.RTDB.Options | App.CF.Options
    ): any

    getRaw(options: RTDB.Get): Promise<any>
    getRaw(options: CF.Get): Promise<any>

    /**
     * Get the result for a content query once. Method does not subscribe
     * to content changes. See the "app.content.subscribe()" method for
     * real-time changes.
     * @async
     * @param {Object} options - Options to customize query.
     * @param {string} [options.schemaKey] - The schema key/ID for which the content should be retrieved
     * @param {string} [options.entryId] - The entry ID for which the content should be retrieved. Requires `schemaKey` to be set.
     * @param {string[]} [options.fields] - An array of fields to be plucked from the results.
     * @param {string} [options.event=value] - RTDB only option to specify the type of Firebase child event to query.
     * @param {string} [options.changeType] - CF only option to specify the type of Firestore child event to query.
     * @param {boolean} [options.orderByKey] - RTDB only option to indicate whether the result should be ordered by the node key.
     * @param {boolean} [options.orderByValue] - RTDB only option to indicate whether the result should be ordered by the node's value.
     * @param {string} [options.orderByChild] - RTDB only option to indicate which child field should be used to order the results by.
     * @param {number} [options.limitToFirst] - RTDB only option to limit the results to given number of entries from the start.
     * @param {number} [options.limitToLast] - RTDB only option to limit the results to given number of entries from the end.
     * @param {string|number} [options.startAt] - RTDB only option to filter results from.
     * @param {string|number} [options.endAt] - RTDB only option to filter results to.
     * @param {string|number} [options.equalTo] - RTDB only option to filter results by value. Goes with `orderByChild` option.
     * @returns {Promise} Promise resolves to result object or array. Will return `null` for no results.
     */
    get(options?: RTDB.Get): Promise<any>
    /**
     * @see Content.Api.get
     */
    get(options?: CF.Get): Promise<any>

    getByFieldRaw?(options: RTDB.GetByField): Promise<any>
    getByFieldRaw?(options: CF.GetByField): Promise<any>

    getByField(options: RTDB.GetByField): Promise<any>
    getByField(options: CF.GetByField): Promise<any>

    subscribeRaw(options: RTDB.Subscribe): App.UnsubscribeMethod
    subscribeRaw(options: CF.Subscribe): App.UnsubscribeMethod

    subscribe(options: RTDB.Subscribe): App.UnsubscribeMethod
    subscribe(options: CF.Subscribe): App.UnsubscribeMethod

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
