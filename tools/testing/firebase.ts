import isPlainObject from 'lodash/isPlainObject'
import * as firebaseTesting from '@firebase/testing'
import seedRtdb from '../../fixtures/seed-rtdb'
import seedCf from '../../fixtures/seed-cf'

const RTDB_NAMESPACE = 'flamelink'

/*
 * ============
 *    Setup
 * ============
 */
export const projectName = 'flamelink-test-project'
export const coverageUrl = `http://localhost:8080/emulator/v1/projects/${projectName}:ruleCoverage.html`
export const firebase = firebaseTesting

/**
 * Creates a new app with authentication data matching the input.
 *
 * @param {object} auth the object to use for authentication (typically {uid: some-uid})
 * @return {object} the app.
 */
export const getFirestoreService = function(auth: any) {
  return firebaseTesting
    .initializeTestApp({ projectId: projectName, auth })
    .firestore()
}

export const initializeRealtimeProject = async function(
  config: any
): Promise<any> {
  const firebaseApp = firebase.initializeAdminApp(
    Object.assign({ databaseName: 'default' }, config)
  )
  await firebaseApp
    .database()
    .ref(RTDB_NAMESPACE)
    .set(seedRtdb())

  return firebaseApp
}

const processDocRefs = (cf: any, doc: any): any => {
  if (!isPlainObject(doc)) {
    return doc
  }

  return Object.keys(doc).reduce((acc, prop) => {
    const val = doc[prop]

    if (isPlainObject(val)) {
      if (val.type === 'ref' && val.val) {
        return Object.assign(acc, { [prop]: cf.doc(val.val) })
      }

      return Object.assign(acc, { [prop]: processDocRefs(cf, val) })
    }

    return acc
  }, doc)
}

const seedCfDoc = async (
  cf: any,
  collectionRef: any,
  doc: any
): Promise<any> => {
  const processedDoc: any = processDocRefs(cf, doc.doc)
  return collectionRef.doc(doc.docId).set(processedDoc)
}

const seedCfCollection = async (
  cf: any,
  name: string,
  docs: any
): Promise<any> => {
  if (!Array.isArray(docs)) {
    return docs
  }

  const collectionRef = cf.collection(name)

  return Promise.all(
    docs.map(async doc => {
      return seedCfDoc(cf, collectionRef, doc)
    })
  )
}

export const initializeFirestoreProject = async function(
  config: any
): Promise<any> {
  const firebaseApp = firebase.initializeAdminApp(config)
  const cf = firebaseApp.firestore()
  const seedData: any = seedCf()
  await Promise.all(
    Object.keys(seedData).map(name => {
      const docs: any[] = seedData[name]
      return seedCfCollection(cf, name, docs)
    })
  )

  return firebaseApp
}

export const cleanup = async function cleanup() {
  return Promise.all(firebaseTesting.apps().map(app => app.delete()))
}

export const getBaseContext = (extras = {}) => ({
  env: 'production',
  locale: 'en',
  modules: {},
  services: {},
  proxySupported: true,
  usesAdminApp: true,
  firebaseApp: {},
  ...extras
})
