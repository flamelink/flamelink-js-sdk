import keys from 'lodash/keys'
import get from 'lodash/get'
import flamelink from '@flamelink/sdk-app'
import * as App from '@flamelink/sdk-app-types'
import { FlamelinkFactory, Api, CF } from '@flamelink/sdk-settings-types'
import { applyOptionsForCF, pluckResultFields } from '@flamelink/sdk-utils'

const SETTINGS_COLLECTION = 'fl_settings'
const LOCALES_COLLECTION = 'fl_locales'

export const factory: FlamelinkFactory = context => {
  const api: Api = {
    ref(settingsKey) {
      const firestoreService = flamelink._ensureService('firestore', context)

      return settingsKey
        ? firestoreService.collection(SETTINGS_COLLECTION).doc(settingsKey)
        : firestoreService.collection(SETTINGS_COLLECTION)
    },

    getRaw({ settingsKey, ...options }: CF.Get = {}) {
      return applyOptionsForCF(api.ref(settingsKey), options).get({
        source: options.source || 'default'
      })
    },

    async get({ settingsKey, ...options }: CF.Get = {}) {
      const pluckFields = pluckResultFields(options.fields)
      const snapshot = await api.getRaw({ settingsKey, ...options })

      if (settingsKey) {
        const docData = await pluckFields({ [settingsKey]: snapshot.data() })
        return docData[settingsKey]
      }

      if (snapshot.empty) {
        return []
      }

      const entries: any = {}

      snapshot.forEach((doc: any) => {
        const data = doc.data()
        entries[get(data, '_fl_meta_.fl_id', doc.id)] = data
      })

      return pluckFields(entries)
    },

    async setEnvironment(env) {
      context.env = env
      return env
    },

    async getEnvironment() {
      return context.env
    },

    async setLocale(locale) {
      context.locale = locale
      return locale
    },

    async getLocale() {
      return context.locale
    },

    async getAvailableLocales() {
      const firestoreService = flamelink._ensureService('firestore', context)

      const snapshot = await firestoreService
        .collection(LOCALES_COLLECTION)
        .get({
          source: 'default'
        })

      if (snapshot.empty) {
        return {}
      }

      const locales: any = {}

      snapshot.forEach((doc: any) => {
        const data = doc.data()
        locales[doc.id] = data
      })

      return locales
    },

    async getGlobals(options: CF.Get = {}) {
      return api.get({
        ...options,
        settingsKey: 'globals'
      })
    },

    async getImageSizes(options: CF.Get = {}) {
      const generalSettings = await api.get({
        ...options,
        settingsKey: 'general'
      })

      return get(generalSettings, 'imageSizes')
    },

    async getDefaultPermissionsGroup(options: CF.Get = {}) {
      const generalSettings = await api.get({
        ...options,
        settingsKey: 'general'
      })

      return get(generalSettings, 'defaultPermissionsGroup')
    },

    subscribeRaw({ settingsKey, callback, ...options }: CF.Subscribe) {
      const filtered = applyOptionsForCF(api.ref(settingsKey), options)

      const args = []

      if (!context.usesAdminApp) {
        args.push({
          includeMetadataChanges: !!options.includeMetadataChanges
        })
      }

      args.push(
        (snapshot: any) => callback(null, snapshot),
        (err: Error) => callback(err, null)
      )

      return filtered.onSnapshot(...args)
    },

    subscribe({ settingsKey, callback, changeType, ...options }: CF.Subscribe) {
      const pluckFields = pluckResultFields(options.fields)

      return api.subscribeRaw({
        settingsKey,
        ...options,
        async callback(err, snapshot) {
          if (err) {
            return callback(err, null)
          }

          if (settingsKey) {
            const docData = await pluckFields({
              [settingsKey]: snapshot.data()
            })
            return callback(null, docData[settingsKey])
          }

          if (snapshot.empty) {
            return callback(null, [])
          }

          const entries: any = {}

          if (changeType) {
            snapshot.docChanges().forEach((change: any) => {
              if (change.type === changeType) {
                const data = change.doc.data()
                entries[get(data, '_fl_meta_.fl_id', change.doc.id)] = data
              }
            })

            if (!keys(entries).length) {
              return
            }
          } else {
            snapshot.forEach((doc: any) => {
              const data = doc.data()
              entries[get(data, '_fl_meta_.fl_id', doc.id)] = data
            })
          }

          return callback(null, pluckFields(entries))
        }
      })
    },

    subscribeGlobals(options: CF.Subscribe) {
      return api.subscribe({ ...options, settingsKey: 'globals' })
    },

    subscribeImageSizes(options: CF.Subscribe) {
      return api.subscribe({
        ...options,
        settingsKey: 'general',
        fields: ['imageSizes'],
        callback(err, data) {
          if (err) {
            return options.callback(err, data)
          }

          return options.callback(null, get(data, 'imageSizes', data))
        }
      })
    },

    subscribeDefaultPermissionsGroup(options: CF.Subscribe) {
      return api.subscribe({
        ...options,
        settingsKey: 'general',
        fields: ['defaultPermissionsGroup'],
        callback(err, data) {
          if (err) {
            return options.callback(err, data)
          }

          return options.callback(
            null,
            get(data, 'defaultPermissionsGroup', data)
          )
        }
      })
    }
  }

  return api
}

export const register: App.SetupModule = (context: App.Context) => {
  if (context.dbType === 'cf') {
    return factory(context)
  }

  return null
}

flamelink._registerModule('settings', register)
