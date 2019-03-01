// Type definitions for Flamelink JavaScript SDK

declare function flamelink(conf?: flamelink.FlamelinkConfig): flamelink.App

declare namespace flamelink {
  interface FlamelinkConfig {
    firebaseApp: any
    dbType: 'rtdb' | 'cf'
    env?: string
    locale?: string
  }

  interface Content {
    ref(ref: string | string[]): any
    getRaw(
      schemaKey: string,
      entryKey: string | number,
      options?: object
    ): Promise<any>
    getRaw(schemaKey: string, options?: object): Promise<any>
    get(
      schemaKey: string,
      entryKey: string | number,
      options?: object
    ): Promise<object | null>
    get(schemaKey: string, options?: object): Promise<object | null>
    getByFieldRaw(
      schemaKey: string,
      field: string,
      value: any,
      options?: object
    ): Promise<any>
    getByField(
      schemaKey: string,
      field: string,
      value: any,
      options?: object
    ): Promise<object | null>
    subscribeRaw(
      schemaKey: string,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribeRaw(
      schemaKey: string,
      options: object,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribeRaw(
      schemaKey: string,
      entryKey: string,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribeRaw(
      schemaKey: string,
      entryKey: string,
      options: object,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribe(
      schemaKey: string,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribe(
      schemaKey: string,
      options: object,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribe(
      schemaKey: string,
      entryKey: string,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribe(
      schemaKey: string,
      entryKey: string,
      options: object,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    unsubscribe(
      schemaKey: string,
      entryKey?: string,
      event?: string
    ): Promise<any>
    set(
      schemaKey: string,
      entryKey: string,
      payload: object | null
    ): Promise<any>
    set(schemaKey: string, payload: object | null): Promise<any>
    update(
      schemaKey: string,
      entryKey: string | number,
      payload: object | null
    ): Promise<any>
    update(schemaKey: string, payload: object | null): Promise<any>
    remove(schemaKey: string, entryKey: string | number): Promise<any>
    transaction(
      schemaKey: string,
      entryKey: string | number,
      updateFn: () => any,
      callbackFn?: () => any
    ): any
  }

  interface Navigation {
    ref(ref: string): any
    getRaw(navigationKey?: string, options?: object): Promise<any>
    getRaw(options: object): Promise<any>
    get(navigationKey?: string, options?: object): Promise<any>
    get(options: object): Promise<any>
    getItemsRaw(navigationKey: string, options?: object): Promise<any>
    getItems(navigationKey: string, options?: object): Promise<any>
    subscribeRaw(callbackFn: (error: any, result: any) => any): Promise<any>
    subscribeRaw(
      navigationKey: string,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribeRaw(
      options: object,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribeRaw(
      navigationKey: string,
      options: any,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribe(callbackFn: (error: any, result: any) => any): Promise<any>
    subscribe(
      navigationKey: string,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribe(
      options: any,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribe(
      navigationKey: string,
      options: any,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    unsubscribe(navigationKey: string, event?: string): Promise<any>
    set(navigationKey: string, payload: object | null): Promise<any>
    update(navigationKey: string, payload: object | null): Promise<any>
    remove(navigationKey: string): Promise<any>
    transaction(
      navigationKey: string,
      updateFn: () => any,
      callbackFn?: () => any
    ): any
  }

  interface Schemas {
    ref(ref: string): any
    getRaw(options?: object): Promise<any>
    getRaw(schemaKey?: string, options?: object): Promise<any>
    get(options?: object): Promise<any>
    get(schemaKey?: string, options?: object): Promise<any>
    getFieldsRaw(options?: object): Promise<any>
    getFieldsRaw(schemaKey?: string, options?: object): Promise<any>
    getFields(options?: object): Promise<any>
    getFields(schemaKey?: string, options?: object): Promise<any>
    subscribeRaw(callbackFn: (error: any, result: any) => any): Promise<any>
    subscribeRaw(
      schemaKey: string,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribeRaw(
      options: any,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribeRaw(
      schemaKey: string,
      options: any,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribe(callbackFn: (error: any, result: any) => any): Promise<any>
    subscribe(
      schemaKey: string,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribe(
      options: any,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribe(
      schemaKey: string,
      options: any,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    unsubscribe(schemaKey: string, event?: string): Promise<any>
    set(schemaKey: string, payload: object | null): Promise<any>
    update(schemaKey: string, payload: object | null): Promise<any>
    remove(schemaKey: string): Promise<any>
    transaction(
      schemaKey: string,
      updateFn: () => any,
      callbackFn?: () => any
    ): any
  }

  interface Storage {
    ref(filename: string, options?: object): any
    folderRef(folderID: string | number): any
    fileRef(fileId: string | number): any
    mediaRef(mediaRef?: string): any
    getRaw(options?: object): Promise<any>
    getRaw(mediaRef?: string, options?: object): Promise<any>
    get(options?: object): Promise<any>
    get(mediaRef: string, options?: object): Promise<any>
    subscribeRaw(callbackFn: (error: any, result: any) => any): Promise<any>
    subscribeRaw(
      mediaKey: string,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribeRaw(
      options: any,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribeRaw(
      mediaKey: string,
      options: any,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribe(callbackFn: (error: any, result: any) => any): Promise<any>
    subscribe(
      mediaKey: string,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribe(
      options: any,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    subscribe(
      mediaKey: string,
      options: any,
      callbackFn: (error: any, result: any) => any
    ): Promise<any>
    unsubscribe(mediaKey: string, event?: string): Promise<any>
    getFoldersRaw(options?: object): Promise<any>
    getFolders(options?: object): Promise<any>
    getFileRaw(fileId: string, options?: object): Promise<any>
    getFile(fileId: string, options?: object): Promise<any>
    getFilesRaw(options?: object): Promise<any>
    getFiles(options?: object): Promise<any>
    getURL(fileId: string, options?: object): Promise<any>
    getMetadata(fileId: string | number, options?: object): Promise<any>
    updateMetadata(fileId: string | number, payload?: object): Promise<any>
    deleteFile(fileId: string | number, options?: object): Promise<any>
    upload(fileData: string | File | Blob | Uint8Array, options?: object): any
  }

  interface Settings {
    ref(ref: string): any
    getRaw(options?: object): Promise<any>
    getRaw(settingsKey: string, options?: object): Promise<any>
    get(options?: object): Promise<any>
    get(settingsKey: string, options?: object): Promise<any>
    setLocale(locale?: string): Promise<string>
    getLocale(): Promise<string>
    setEnvironment(environment?: string): Promise<string>
    getEnvironment(): Promise<string>
    getImageSizes(options?: object): Promise<any>
    getDefaultPermissionsGroup(options?: object): Promise<any>
    getGlobals(options?: object): Promise<any>
  }

  export interface App {
    // name: string
    // firebaseApp: any
    // databaseService: any
    // storageService: any
    // authService: any
    // firestoreService: any
    content: Content
    nav: Navigation
    schemas: Schemas
    storage: Storage
    settings: Settings
  }

  export const VERSION: string
}

// Global export outside of module loader environment
export as namespace flamelink

// Export for build systems (module loaders)
export = flamelink
