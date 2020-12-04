<!-- TITLE/ -->

<h1>Flamelink JavaScript SDK</h1>

<!-- /TITLE -->

<!-- BADGES/ -->

<span class="badge-badge"><a href="https://lernajs.io/" title="Maintained by Lerna"><img src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg" alt="Lerna" /></a></span>
<span class="badge-badge"><a href="https://conventionalcommits.org" title="Conventional Commits"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Conventional Commits" /></a></span>
<span class="badge-npmversion"><a href="https://npmjs.org/package/flamelink" title="View this project on NPM"><img src="https://img.shields.io/npm/v/flamelink.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/flamelink" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/flamelink.svg" alt="NPM downloads" /></a></span>
<span class="badge-badge"><a href="https://circleci.com/gh/flamelink/flamelink-js-sdk.svg?style=svg&circle-token=dd64f26e069cdd05f52cf304304e0d97ee967b07" title="CircleCI"><img src="https://circleci.com/gh/flamelink/flamelink-js-sdk.svg?style=svg&circle-token=dd64f26e069cdd05f52cf304304e0d97ee967b07" alt="CircleCI" /></a></span>
<span class="badge-badge"><a href="https://www.jsdelivr.com/package/npm/flamelink" title="jsDelivr"><img src="https://data.jsdelivr.com/v1/package/npm/flamelink/badge" alt="jsDelivr" /></a></span>
<br class="badge-separator" />

<!-- /BADGES -->

![logo](https://raw.githubusercontent.com/flamelink/flamelink/master/docs/_assets/icon.svg?sanitize=true)

> Easily integrate with your Flamelink CMS.

**Official Flamelink JavaScript SDK for both the Firebase Realtime database and Cloud Firestore**

**_PLEASE NOTE: THIS PACKAGE IS CURRENTLY IN DEVELOPMENT - PLEASE USE WITH CAUTION OR USE THE [LEGACY STABLE VERSION](https://flamelink.github.io/flamelink) (ONLY SUPPORTS RTDB)_**

<!-- DESCRIPTION/ -->

This SDK is intended for use in a browser or Node.js environment.

If you are unfamiliar with Flamelink, please visit our [flamelink.io](https://www.flamelink.io/) website for more info on features, pricing and more.

<!-- /DESCRIPTION -->

## Prerequisites

It goes without saying that you will need to have a [Flamelink](https://www.flamelink.io) project for this SDK to be of any use to you.

Apart from the Flamelink project, the only real hard dependency is either the [Firebase JavaScript SDK](https://www.npmjs.com/package/firebase) or [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup), depending on whether you use Flamelink from a browser or server environment. Take a look at the installation instructions on their README files, but in short, just make sure you add `firebase` and/or `firebase-admin` as a dependency to your project.

> When running a universal app, you might need to switch been the client and admin SDK depending on where in the stack the code is running.

Once you have `firebase` installed, you can install `flamelink` using any of the following options (we recommend `npm` or `yarn`):

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

### Importing/Adding the dependencies

First ensure that you load the `firebase` SDK and then the main `flamelink` app package along with any of the modules you want to you in your project.

> The examples below shows you how to quickly get started. Take a look at the [Advanced Installation](https://flamelink.github.io/flamelink-js-sdk/#/getting-started?id=advanced-installation) instructions to import only what you need.

In a CommonJS environment:

```javascript
var flamelink = require('flamelink')
```

or using ES Modules or TypeScript:

```javascript
import flamelink from 'flamelink'
```

> **Note:** You might need to enable the `esModuleInterop` option in either your `tsconfig.json` file or provided as a CLI flag when using TypeScript.

### Creating your Flamelink app instance

Create your `flamelink` app instance by passing in an existing `firebaseApp` instance along with any other `flamelink` config options:

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

const app = flamelink({
  firebaseApp, // required
  dbType: 'rtdb', // can be either 'rtdb' or 'cf' for Realtime DB or Cloud Firestore
  env: 'production', // optional, default shown
  locale: 'en-US', // optional, default shown
  precache: true // optional, default shown. Currently it only precaches "schemas" for better performance
})
```

> **Tip:** Go to your [Firebase console](https://console.firebase.google.com/) for more info regarding the Firebase app options.

When using the `firebase-admin` SDK on server-side, it is the same, you only pass in the Firebase admin app instance instead:

```javascript
const admin = require('firebase-admin')
const flamelink = require('flamelink')
const serviceAccount = require('path/to/serviceAccountKey.json')

const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: '<your-database-url>',
  storageBucket: '<your-storage-bucket-code>' // required if you want to use any Storage Bucket functionality
}

const firebaseApp = admin.initializeApp(config)

const app = flamelink({
  firebaseApp // required
  // same options as above
})
```

> You can use any of the [different ways to create the admin firebaseApp instance](https://firebase.google.com/docs/admin/setup).

### Using your flamelink app

Once you have an instance of the [`flamelink` app](https://app.flamelink.io), you can start using it to interact with your data stored in either your Firebase Real-time Database or Cloud Firestore. Suppose you want to retrieve all your `products` created under the "Content" section in `flamelink`.

```javascript
const products = await app.content.get({ schemaKey: 'products' })
console.log('All of your products:', products)
```

As easy as that. Read our [docs](https://flamelink.github.io/flamelink-js-sdk) for more specifics.

> 🔥🔥🔥 **Flame on!!** 🔥🔥🔥

<!-- HISTORY/ -->

<h2>History</h2>

<a href="https://github.com/flamelink/flamelink-js-sdk/blob/master/HISTORY.md#files">Discover the release history by heading on over to the <code>HISTORY.md</code> file.</a>

<!-- /HISTORY -->

<!-- BACKERS/ -->

<h2>Backers</h2>

<h3>Maintainers</h3>

These amazing people are maintaining this project:

<ul><li><a href="http://jperasmus.me">JP Erasmus</a> — <a href="https://github.com/flamelink/flamelink-js-sdk/commits?author=jperasmus" title="View the GitHub contributions of JP Erasmus on repository flamelink/flamelink-js-sdk">view contributions</a></li>
<li><a href="https://github.com/dewetvdm">De Wet van der Merwe</a> — <a href="https://github.com/flamelink/flamelink-js-sdk/commits?author=dewetvdm" title="View the GitHub contributions of De Wet van der Merwe on repository flamelink/flamelink-js-sdk">view contributions</a></li></ul>

<h3>Sponsors</h3>

No sponsors yet! Will you be the first?

<h3>Contributors</h3>

These amazing people have contributed code to this project:

<ul><li><a href="http://jperasmus.me">JP Erasmus</a> — <a href="https://github.com/flamelink/flamelink-js-sdk/commits?author=jperasmus" title="View the GitHub contributions of JP Erasmus on repository flamelink/flamelink-js-sdk">view contributions</a></li>
<li><a href="https://github.com/dewetvdm">De Wet van der Merwe</a> — <a href="https://github.com/flamelink/flamelink-js-sdk/commits?author=dewetvdm" title="View the GitHub contributions of De Wet van der Merwe on repository flamelink/flamelink-js-sdk">view contributions</a></li>
<li><a href="flamelink.io">De Wet van der Merwe</a> — <a href="https://github.com/flamelink/flamelink-js-sdk/commits?author=gitdubz" title="View the GitHub contributions of De Wet van der Merwe on repository flamelink/flamelink-js-sdk">view contributions</a></li>
<li><a href="http://github.com/apps/dependabot">dependabot[bot]</a> — <a href="https://github.com/flamelink/flamelink-js-sdk/commits?author=dependabot[bot]" title="View the GitHub contributions of dependabot[bot] on repository flamelink/flamelink-js-sdk">view contributions</a></li></ul>

<a href="https://github.com/flamelink/flamelink-js-sdk/blob/master/CONTRIBUTING.md#files">Discover how you can contribute by heading on over to the <code>CONTRIBUTING.md</code> file.</a>

<!-- /BACKERS -->

<!-- LICENSE/ -->

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; <a href="http://flamelink.io">Flamelink</a></li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li></ul>

<!-- /LICENSE -->
