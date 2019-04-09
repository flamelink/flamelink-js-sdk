# Getting Started

## Prerequisites

You will need to have a [Flamelink](https://www.flamelink.io) project for this SDK to be of any use to you. If you don't have one yet, go and [sign up](https://app.flamelink.io/register) now and then come back.

Apart from the Flamelink project, the only real dependency is either the [Firebase client SDK](https://www.npmjs.com/package/firebase) or [Firebase admin SDK](https://firebase.google.com/docs/admin/setup), depending on whether you use Flamelink from the browser or server. Take a look at their installation instructions for details, but in short, make sure you add `firebase` or `firebase-admin` as a dependency to your project.

Once you have `firebase` installed, you can install `flamelink` using any of the following options (we recommend installing with `yarn` or `npm`):

## Installation

Install with `npm`

```bash
npm install --save flamelink@next
```

or with `yarn`

```bash
yarn add flamelink@next
```

or with a `<script>` tag hosted from any of these CDN's

### jsDelivr

[![](https://data.jsdelivr.com/v1/package/npm/flamelink/badge)](https://www.jsdelivr.com/package/npm/flamelink)

Add the following script tag to the `<body>` of your index.html file:

```html
<script src="//cdn.jsdelivr.net/npm/flamelink/flamelink.js"></script>
```

This will always load the latest version of this SDK for you. If you want to load a specific version, you can specify the version number as well (1.0.0 in the example):

```html
<script src="//cdn.jsdelivr.net/npm/flamelink@1.0.0/flamelink.js"></script>
```

> See the [jsDelivr website](https://www.jsdelivr.com/?query=flamelink) for more options

### unpkg

Add the following script tag to the `<body>` of your index.html file:

```html
<script src="//unpkg.com/flamelink/flamelink.js"></script>
```

This will always load the latest version of this SDK for you. If you want to load a specific version, you can specify the version number as well (1.0.0 in the example):

```html
<script src="//unpkg.com/flamelink@1.0.0/flamelink.js"></script>
```

> See the [unpkg website](https://unpkg.com) for more options

## Usage

### Importing / Adding the dependencies

First ensure that you load the `flamelink` package to your file. When using the `<script>` tag version, you will need to load both `firebase` and `flamelink` which will then be globally available on the browser's `window` object.

Depending on your app setup, you can import the package using `require()` statements:

```javascript
var flamelink = require('flamelink')
```

or using ES2015/ES6 imports:

```javascript
import flamelink from 'flamelink'
```

or using TypeScript:

```javascript
import * as flamelink from 'flamelink'
```

### Creating your Flamelink app instance

You can create your `flamelink` app instance by passing in a `firebaseApp` instance along with any other `flamelink` config options (remember to import `firebase` of `firebase-admin` first):

```javascript
// Firebase app is always required and must be first
import firebase from 'firebase/app'
// Add additional services that you want to use
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
// import 'firebase/firestore'
// import 'firebase/messaging'
// import 'firebase/functions'

// Flamelink app is always required
import flamelink from 'flamelink/app'
// Add additional modules that you want to use
import 'flamelink/content'
import 'flamelink/storage'
// import 'flamelink/settings'
// import 'flamelink/navigation'
// import 'flamelink/users'

const firebaseConfig = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  projectId: '<your-project-id>',
  storageBucket: '<your-storage-bucket-code>',
  messagingSenderId: '<your-messenger-id>'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const app = flamelink({
  firebaseApp,
  env: 'production', // optional, defaults to `production`
  locale: 'en-US', // optional, defaults to `en-US`
  dbType: 'rtdb' // optional, defaults to `rtdb` - can be 'rtdb' or 'cf' (Real-time DB vs Cloud Firestore)
})
```

?> **Tip:** Go to your [Firebase console](https://console.firebase.google.com/) to find the Firebase web config settings.

When using the `firebase-admin` SDK in a Node.js server environment, the installation is similar (example imports everything, but you can also only `require` what you need):

```javascript
const admin = require('firebase-admin')
const flamelink = require('flamelink')
const serviceAccount = require('path/to/serviceAccountKey.json')

const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount), // required
  databaseURL: '<your-database-url>', // required
  storageBucket: '<your-storage-bucket-code>' // required if you want to use any Storage functionality
}

const firebaseApp = admin.initializeApp(config)

const app = flamelink({
  firebaseApp,
  dbType: 'cf'
})
```

> You can use any of the [different ways to create the admin firebaseApp instance](https://firebase.google.com/docs/admin/setup), as long as you provide it to the flamelink function as `firebaseApp`.

### Using your flamelink app

Once you have an instance of the [`flamelink` app](https://app.flamelink.io), you can start using it to interact with your data stored in your firebase database. Suppose you want to retrieve all your products created under the "Content" section in `flamelink`.

_Using async-await:_

```javascript
try {
  const products = await app.content.get({ schemaKey: 'products' })
  console.log('All of your products:', products)
} catch (error) {
  // handle any errors
}
```

_Using standard Promises:_

```javascript
app.content.get({ schemaKey: 'products' })
  .then(products => console.log('All of your products:', products))
  .catch(error => // handle any errors)
```

!> Since Flamelink is built on top of Firebase, anything you can do with Firebase, you can do with Flamelink, eg. do you need a REST API, use the [Firebase REST API](https://firebase.google.com/docs/reference/rest/database/) directly.

Check out the [API docs](/api-overview) for all the available methods!

> 🔥🔥🔥 **PSST. Your coding skills... So hot right now.** 🔥🔥🔥
