import * as firebaseTesting from '@firebase/testing'
import seedRtdb from '../../fixtures/seed-rtdb'

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
  const firebaseApp = firebase.initializeAdminApp(config)
  await firebaseApp
    .database()
    .ref(RTDB_NAMESPACE)
    .set(seedRtdb())

  return firebaseApp
}

export const cleanup = async function cleanup() {
  return Promise.all(firebaseTesting.apps().map(app => app.delete()))
}
