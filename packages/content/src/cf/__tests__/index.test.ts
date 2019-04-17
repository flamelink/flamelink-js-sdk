import { Context } from '@flamelink/sdk-app-types'
import { FirebaseApp } from '@firebase/app-types'
import * as Content from '@flamelink/sdk-content-types'
import {
  initializeFirestoreProject,
  getBaseContext
} from '../../../../../tools/testing/firebase'
import getAPI from '../index'

let firebaseApp: FirebaseApp
let context: Context
let api: Content.Api

describe('Content Module > CF', () => {
  beforeAll(async () => {
    firebaseApp = await initializeFirestoreProject({
      projectId: 'my-test-project'
    })

    context = getBaseContext({
      firebaseApp,
      dbType: 'cf',
      precache: false
    })

    api = getAPI(context)
  }, 10000)

  afterAll(() => {
    firebaseApp = null
    context = null
    api = null
  })

  test('should be possible to retrieve a reference', async () => {
    const ref = api.ref()
    // TODO: Figure out how to check if the response object is a Firestore CollectionReference/DocumentReference
    expect(ref).toEqual(expect.any(Object))
  }, 100000)
})
