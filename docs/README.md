# Flamelink JavaScript SDK

Welcome to the Flamelink Software Development Kit (SDK) docs. If you're reading this, you are most likely already using Flamelink (the CMS) or are considering it for your next project. These docs should hopefully make integrating with your Flamelink CMS a breeze.

This SDK is intended to be used in either a browser or Node.js server environment. It supports both the Firebase Real-time Database as well as Cloud Firestore. Some Firebase functionality, like the Storage Bucket functionality is not supported server-side when using the client [Firebase SDK](https://www.npmjs.com/package/firebase). If you find that you need to reference anything that is stored in the Storage Bucket (files!) when using this SDK server side, you would need to use Firebase's official [admin SDK](https://firebase.google.com/docs/admin/setup). The admin SDK allows you to access other more privileged information that should only be accessed from a server. We support both packages within the Flamelink SDK. See the [Usage](/getting-started?id=creating-your-flamelink-app-instance) section to see how to use either the Firebase client or admin SDK with Flamelink.

## What is Flamelink?

If you are unfamiliar with Flamelink, please visit our [flamelink.io](https://www.flamelink.io/) website for more info on features, pricing and more.

## Why use this SDK?

You might wonder why you would use the Flamelink SDK and not the Firebase SDK's directly. The short answer is that you can use the Firebase SDK's if you prefer that, but the Flamelink SDK aims to make the experience a lot nicer and easier for you.

The Flamelink SDK is in fact an abstraction that uses the Firebase SDK internally.

### A few advantages of using the Flamelink SDK

- It is context aware - meaning, it uses the `environment` and `locale` you set when initializing - you would need to handle this yourself without the SDK
- It understands the Flamelink specific database and storage bucket structures
- It is more declarative (**nicer!**): `app.content.get({ schemaKey: 'blogs' })` vs `firebaseApp.database().ref('/flamelink/environments/<some-env>/content/blogs').once('value')`
- It handles relational and media data mapping for you. Only the file or entry ID is stored in the DB, which you would need to populate yourself without the SDK
- It works client and server-side and handles some of the nuances when trying to work with the Storage buckets server-side

## Browser Support

Since this SDK is built on top of Firebase's SDK's, it naturally means all limitations in terms of browser or Node.js version support will be the same for Flamelink. Take a look at Firebase's [supported environments](https://github.com/firebase/firebase-js-sdk/blob/HEAD/ENVIRONMENTS.md) document for a list of officially supported environments.

Are you ready to [get started](/getting-started)?

> 🔥🔥🔥 **PSST. Let's go!** 🔥🔥🔥
