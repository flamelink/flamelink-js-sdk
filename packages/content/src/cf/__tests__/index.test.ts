import { Context } from '@flamelink/sdk-app-types'
import Content from '@flamelink/sdk-content-types'
import { firebase, cleanup } from '../../../../../tools/testing/firebase'
import createContentAPI from '../index'

let firebaseApp: any
let context: Context
let api: Content.Api

describe('Content Module > CF', () => {
  beforeAll(async () => {
    firebaseApp = firebase.initializeTestApp({
      projectId: 'my-test-project',
      auth: null // { uid: 'alice', email: 'alice@example.com' }
    })

    context = {
      firebaseApp,
      env: 'production',
      locale: 'en-US',
      dbType: 'cf',
      modules: {},
      services: {},
      cache: {},
      // emitter: new EventEmitter(),
      precache: false,
      proxySupported: typeof Proxy !== 'undefined',
      usesAdminApp: true,
      isNodeEnvironment: true
    }

    api = createContentAPI(context)
  }, 10000)

  afterAll(async () => {
    firebaseApp = null
    context = null
    api = null
    await cleanup()
  })

  test('should be possible to retrieve a reference', async () => {
    expect.assertions(1)
    const ref = api.ref()
    // TODO: Figure out how to check if the response object is a Firestore CollectionReference/DocumentReference
    expect(ref).toEqual(expect.any(Object))
  }, 100000)
})
