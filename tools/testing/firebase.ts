import * as firebaseTesting from '@firebase/testing'
// const fs = require('fs')

/*
 * ============
 *    Setup
 * ============
 */
export const projectName = 'flamelink-test-project'
export const coverageUrl = `http://localhost:8080/emulator/v1/projects/${projectName}:ruleCoverage.html`

// const rules = fs.readFileSync('firestore.rules', 'utf8')

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

export const cleanup = async function cleanup() {
  return Promise.all(firebaseTesting.apps().map(app => app.delete()))
}

export const firebase = firebaseTesting
