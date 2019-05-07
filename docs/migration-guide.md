# Migration Guide

The new version of this SDK introduces a number of breaking changes and is the reason for the major version change. If you follow proper [semver practices](https://semver.org/) you should not be automatically affected. You can remain on [v0.x](https://flamelink.github.io/flamelink) for the forseeable future, but be aware that no new development will take place on that version and that it only supports the Firebase Realtime Database. When you are ready to upgrade to this new SDK version, this is what you need to know:

## App initialization

In v0.x you could initialize your Flamelink app instance either by providing all of the Firebase config options or by providing the already initialized Firebase app instance. The new SDK version drops support for the individual config variables and now requires you to specify the `firebaseApp` instance. This instance can be either a Firebase client or admin app instance.

!> Bonus: You no longer need to specify the `isAdminApp: true` flag when initialization server-side - the SDK will determine this for you.

v0.x

```javascript
import flamelink from 'flamelink'

// Just pass everything to the `flamelink` factory
const app = flamelink({
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  projectId: '<your-project-id>',
  storageBucket: '<your-storage-bucket-code>',
  messagingSenderId: '<your-messenger-id>',
  env: 'production',
  locale: 'en-US',
  dbType: 'rtdb' // can be 'rtdb' or 'cf' (Real-time DB vs Cloud Firestore)
})
```

v1.x

```javascript
import * as firebase from 'firebase'
import flamelink from 'flamelink'

const firebaseConfig = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  projectId: '<your-project-id>',
  storageBucket: '<your-storage-bucket-code>',
  messagingSenderId: '<your-messenger-id>'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

// Provide the already initialized `firebaseApp` instance - can be client or admin Firebase app instance
const app = flamelink({
  firebaseApp,
  env: 'production',
  locale: 'en-US',
  dbType: 'rtdb' // can be 'rtdb' or 'cf' (Real-time DB vs Cloud Firestore)
})
```

You might argue that the previous version was easier, and you would be right, but requiring you to provide the Firebase app instance, means the Flamelink library is not tightly coupled to a specific version of the Firebase SDK (not to speak of client vs admin SDK's) and can ensure the Flamelink library can be way smaller in size - a big win for a small sacrifice.

## Options payload

All<sup>\*</sup> API methods now use a single `options` object as the only argument instead of different arguments. This affects all the methods, so please ensure you make the necessary changes.

v0.x:

```javascript
const blogPost = await app.content.get('blogPosts', '1502966447501', {
  fields: ['title', 'description']
})
```

v1.x:

```javascript
const blogPost = await app.content.get({
  schemaKey: 'blogPosts',
  entryId: '1502966447501',
  fields: ['title', 'description']
})
```

See the documentation for each individual method for details.

## Exposed Firebase Services

To go hand-in-hand with the initialization change, all the individual Firebase services are no longer eagerly initialized and exposed on the Flamelink app instance:

v0.x

```javascript
app.firebaseApp // The Firebase App instance
app.databaseService // The real-time database service
app.storageService // The cloud storage service
app.authService // The authentication service
app.firestoreService // The cloud firestore service
```

v1.x

All of these services are now lazily initialized, ie. only when you first use them and can be directly accessed from the `firebaseApp` instance that you passed into the flamelink factory function:

```javascript
// You already have the `firebaseApp` instance because you provide it to Flamelink
firebaseApp.database() // The real-time database service
firebaseApp.storage() // The cloud storage service
firebaseApp.auth() // The authentication service
firebaseApp.firestore() // The cloud firestore service
```

## Method deprecations

Some module methods have been completely removed.

### "unsubscribe"

All "subscribe" methods now return their own "unsubscribe" methods instead of having a separate "unsubscribe" method:

v0.x

```javascript
app.content.subscribe('blogPosts', '1502966447501', function(error, blogPost) {
  if (error) {
    return // handle error
  }
  console.log('Individual blog post with options applied:', blogPost)
})

// some time later
app.content.unsubscribe('blogPosts', '1502966447501')
```

v1.x

```javascript
// NOTE: This method does not return a Promise but the unsubscribe method - don't use `async`
const unsubscribe = app.content.subscribe({
  schemaKey: 'blogPosts',
  entryId: '1502966447501',
  callback(error, blogPost) {
    if (error) {
      return // handle error
    }
    console.log('Individual blog post with options applied:', blogPost)
  }
})

// some time later
unsubscribe()
```

### "set" becomes "add"

The "set" method was a source of confusion for many users and was too closely modeled after the Firebase "set" method. It has now been replaced by the more intuitive "add" method for all modules. It is no longer necessary to specify the entry ID when using the "add" method since the correct ID will be created for you. This method also sets the correct metadata for you on each entry.

v0.x

```javascript
// NOTE: you had to specify the ID for the entry here
app.content
  .set('blogPosts', '1502966447501', { title: 'new-title' })
  .then(() => console.log('Setting the entry succeeded'))
  .catch(() => console.error('Something went wrong while setting the entry.'))
```

v1.x

```javascript
// NOTE: the ID is now auto-generated for you and the entry content is specified with the `data` property
app.content
  .add({ schemaKey: 'blogPosts', data: { title: 'new-title' } })
  .then(() => console.log('Added entry successfully'))
  .catch(() => console.error('Something went wrong while adding the entry.'))
```

### "transaction"

The "transaction" method was almost never used and has therefore been deprecated in favour of a smaller bundle size.

v0.x

```javascript
app.content.transaction(
  'blogPosts',
  '1502966447501',
  function updateFn(blogEntry) {
    // Take in the existing state (blogEntry) and return the new state
    return blogEntry
  },
  function callback() {
    // Transaction finished
  }
)
```

v1.x

```javascript
// This is an advanced use case - use the Firebase SDK directly
```

### "storage.upload()"

The "storage.upload()" method returns a Promise resolving to the database file object now instead of the upload task.

v0.x

```javascript
const file = ... // get file from the File or Blob API
const uploadTask = await app.storage.upload(file)
```

v1.x

```javascript
const file = ... // get file from the File or Blob API
const fileObject = await app.storage.upload(file)
```

## Type Definitions

If you are using TypeScript, the type definitions has changed slightly. The types are still exposed under the `flamelink` namespace, but the internals are much simplified.

Most of the types should be inferred by default, so you most likely don't need to explicitly set them.

v0.x

```javascript
import * as flamelink from 'flamelink'

const config: flamelink.FlamelinkConfig = {
  firebaseApp: yourFirebaseAppInstance,
  env: 'production',
  locale: 'en-US'
}
const flamelinkApp: flamelink.App = flamelink(config)
```

v1.x

```javascript
import * as flamelink from 'flamelink/app'

const config: flamelink.Config = {
  firebaseApp: yourFirebaseAppInstance,
  env: 'production',
  locale: 'en-US',
  dbType: 'rtdb'
}
const flamelinkApp: flamelink.App = flamelink(config)
```

Please [log any issues](https://github.com/flamelink/flamelink-js-sdk/issues) you might find with the types so that we can address them.
