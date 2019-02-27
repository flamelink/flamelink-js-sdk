import flamelink from '@flamelink/sdk-app'
import {
  FlamelinkSettingsFactory,
  SettingsPublicApi
} from '@flamelink/sdk-settings-types'
import { applyOptionsForCF, pluckResultFields } from '@flamelink/sdk-utils'

const SETTINGS_COLLECTION = 'fl_settings'

const factory: FlamelinkSettingsFactory = context => {
  const api: SettingsPublicApi = {
    ref(document) {
      const firestoreService = flamelink._ensureService('firestore', context)

      return document
        ? firestoreService.collection(SETTINGS_COLLECTION).doc(document)
        : firestoreService.collection(SETTINGS_COLLECTION)
      // .where('_fl_meta_.env', '==', context.env)
      // .where('_fl_meta_.locale', '==', context.locale)
    },

    getRaw({ document, ...options } = {}) {
      return applyOptionsForCF(api.ref(document), options).get({
        source: options.source || 'default'
      })
    },

    async get({ document, ...options } = {}) {
      const pluckFields = pluckResultFields(options.fields)
      const snapshot = await api.getRaw({ document, ...options })

      if (document) {
        const docData = await pluckFields({ [document]: snapshot.data() })
        return docData[document]
      }

      if (snapshot.empty) {
        return []
      }

      const entries: any[] = []
      snapshot.forEach((doc: any) => entries.push(doc.data()))

      return pluckFields(entries)
    },

    async setEnvironment(env) {
      context.env = env
      return env
    },

    async getEnvironment() {
      return context.env
    },

    // TODO: Consider checking for supported locales - if we want - don't want to make API request
    async setLocale(locale) {
      context.locale = locale
      return locale
    },

    async getLocale() {
      return context.locale
    },

    async getGlobals(options = {}) {
      return api.get({
        ...options,
        document: 'globals'
      })
    },

    async getImageSizes(options = {}) {
      return api.get({
        ...options,
        document: 'general',
        fields: ['imageSizes']
      })
    },

    async getDefaultPermissionsGroup(options = {}) {
      return api.get({
        ...options,
        document: 'general',
        fields: ['defaultPermissionsGroup']
      })
    },

    subscribeRaw({ document, callback, ...options }) {
      const filtered = applyOptionsForCF(api.ref(document), options)

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

    subscribe({ document, callback, changeType, ...options }) {
      const pluckFields = pluckResultFields(options.fields)

      return api.subscribeRaw({
        document,
        ...options,
        async callback(err, snapshot) {
          if (err) {
            return callback(err, null)
          }

          if (document) {
            const docData = await pluckFields({ [document]: snapshot.data() })
            return callback(null, docData[document])
          }

          if (snapshot.empty) {
            return callback(null, [])
          }

          const entries: any[] = []

          if (changeType) {
            snapshot.docChanges().forEach((change: any) => {
              if (change.type === changeType) {
                entries.push(change.doc.data())
              }
            })

            if (!entries.length) {
              return
            }
          } else {
            snapshot.forEach((doc: any) => entries.push(doc.data()))
          }

          return callback(null, pluckFields(entries))
        }
      })
    },

    subscribeGlobals(options) {
      return api.subscribe({ ...options, document: 'globals' })
    },

    subscribeImageSizes(options) {
      return api.subscribe({
        ...options,
        document: 'general',
        fields: ['imageSizes']
      })
    },

    subscribeDefaultPermissionsGroup(options) {
      return api.subscribe({
        ...options,
        document: 'general',
        fields: ['defaultPermissionsGroup']
      })
    }
  }

  return api
}

export default factory
