# API Overview

The Flamelink SDK exposes a Promise-based API that is intended to be very intuitive for you as the developer. If you are familiar with JavaScript Promises, you should feel right at home. If you are not, take a quick peek at the [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or [Google Developer](https://developers.google.com/web/fundamentals/getting-started/primers/promises) docs and `then` 😂 come straight back here.

All the API methods are available on a separate namespace/module of the Flamelink `app` instance that you've created, eg `app.content.get({ schemaKey: 'blogPosts' })`. The details for each of these methods can be found under the relevant sub-headings in these docs.

This SDK can be used for either Firebase Real-time Database or Cloud Firestore projects and the surface API is mostly similar. Where there are difference, they are called out explicitly.

> All methods are subject to the [Firebase Real-time Database](https://firebase.google.com/docs/database/security/), [Cloud Firestore](https://firebase.google.com/docs/firestore/security/get-started) or [Cloud Storage](https://firebase.google.com/docs/storage/security/) rules. That means, if you have database rules set up that only allows authenticated users access to read and write to your database, you would need to authenticate with a Firebase auth user before trying to use this API. It is always a good idea to only allow as little access as possible. If certain content should only be available behind a login, set up the rules to require authentication for the particular read or write action and then make sure you authenticate against the Firebase app first before trying to call the Flamelink SDK's methods.

---

## Naming Conventions

All the API methods that are used to retrieve data **once** from Firebase start with the word `get`, eg `app.content.get()` or `app.nav.getItems()`, etc. Think of this as the equivalent of the `firebaseApp.database().ref().once()` or `firebaseApp.firestore().collection().get()` methods with nice declarative sugar on top.

!> Some of the API methods have a `raw` method as well, which exposes the Firebase **snapshot** object. These methods are not explicitly documented in detail, but it is good to know about them if you find you need to access the response snapshots directly. Be aware that the raw methods can not include all the nice data manipulations that you will get with the standard API methods because all of it is what you will get back from a Firebase query directly, but it includes the filtering and ordering options that Firebase provides.

---

## Firebase App Instance

In the unlikely event that you run into a sticky situation where you need to perform an advanced query that you're unable to do with the Flamelink SDK, you can use the `firebaseApp` instance as you would do without Flamelink. Flamelink stores all your content in the Cloud Storage bucket as well as either one of the realt-time database or cloud firestore.

> 🔥🔥🔥 **Ok. Take a quick Flame-break!!!** 🔥🔥🔥

---

## Fields

Most of the API methods allow you to pluck out only the fields that you want from the result set instead of working with everything. This can easily be done by passing the `fields` option. The `fields` option is an array of field names (`strings`).

This example will get all the blog posts but only the `title`, `description` and `image` field for each.

```javascript
app.content.get({ schemaKey: 'blogPosts', fields: [ 'title', 'description', 'image' ] })
```

## Database Events & Changes

Both the Real-time database and Cloud Firestore allows you to only query for specific events or changes.

### Real-time database

For the RTDB, the event is the child event to retrieve data for. By default, the `event` is `'value'`, which is used for retrieving the entire content at the given reference(s) path.

The allowed child event options are: `'value'`, `'child_added'`, `'child_changed'`, `'child_removed'` and `'child_moved'`.

> To read more about these events, see the [Firebase docs](https://firebase.google.com/docs/database/web/lists-of-data#listen_for_child_events).

```javascript
app.content.get({ schemaKey: 'blogPosts', event: 'child_changed' })
```

### Cloud Firestore

For CF, you can specify the [types of changes](https://firebase.google.com/docs/firestore/query-data/listen#view_changes_between_snapshots) you want to listen for when using the real-time listeners.

This SDK makes it easy - simply specify the `changeType` option as one of `'added'`, `'modified'` or `'removed'` and you will only receive the changes matching that type.

```javascript
app.content.subscribe({
  schemaKey: 'blogPosts',
  changeType: 'added',
  callback(error, result) {
    // Handle error or result
  }
})
```

---

## Media files, Relational Data and References

All relational data, including images and other files are stored as ID's in the Real-time database and as [document references](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference) in the Cloud Firestore database. To expand these ID's into the entry objects that they represent Flamelink makes a `populate` option available.

In the simplest case, you can set `populate: true` and all relational fields will be populated into their relevant objects. This is great, but you might want more control over which fields you want to populate so that you do not make unnecessary requests to your database. For these cases, you can specify the exact fields to populate.

?> **HOT TIP:** When specifying a media field to be populated for you, it will replace the file ID for you with an object containing all the file's data including a `url` property which is the URL to your file in the storage bucket.

A basic example that only populates a field called `category` for each `blogPosts` entry:

```javascript
app.content.get({
  schemaKey: 'blogPosts',
  populate: [ 'category' ]
});
```

There is also an alternative, more flexible option, to pass through an array of **objects** instead of **strings**. The important thing is to set the `field` attribute to the name of the field that should be populated.

This option allows you to apply other options and filters like the `fields` option above to each populated entry, as well as allow infinitely nested relationships.

As an example, the following code snippet will find all your blog posts and then populate the `category` relational field along with the `banner-image` media field, but only return the `id`, `name`, `icon` and `section` for each category assigned to each blog post. Additionally, each `category` might be related to a `section`, so populate that as well.

```javascript
app.content.get({
  schemaKey: 'blogPosts',
  populate: [
    {
      field: 'category',
      fields: [ 'id', 'name', 'icon', 'section' ],
      populate: [ 'section' ]
    },
    {
      field: 'banner-image'
    }
  ]
});
```

!> **For advanced use:** It is also possible to populate fields for `repeater` and `field group` fields by specifying the `subFields` to populate.

```javascript
app.content.get({
  schemaKey: 'blogPosts',
  populate: [
    {
      field: 'some-repeater-field',
      subFields: [ 'field-inside-repeater-field' ]
    }
  ]
});
```

?> **Tip:** The array of __strings__ *vs* array of __objects__ syntax can be mixed and matched if you want.

---

## Sorting, Filtering and Ordering data

Where appropriate, [Firebase's](https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data) and [Firestore's](https://firebase.google.com/docs/firestore/query-data/queries#simple_queries) filtering and ordering query options are made available to the different API methods. Since Cloud Firestore's querying functionality is way more powerful than that of the Real-time database, there are different limitations and options for each.

### Ordering

The following options are available to order your result sets:

#### Real-time database

| Property Name | Example Value Param                                    | Usage                                                                   |
|---------------|--------------------------------------------------------|-------------------------------------------------------------------------|
| orderByKey    | can only be `true`                                     | Order the results by the child keys. This normally means the entry IDs. |
| orderByValue  | can only be `true`                                     | Order the results by the child values.                                  |
| orderByChild  | string name of child key, eg. `description` or `price` | Order the results by the specified child key.                           |

> These ordering options can not be combined - only one can be used per query/request.

#### Cloud Firestore

| Property Name | Example Value Param                                  | Usage                                                                       |
|---------------|------------------------------------------------------|-----------------------------------------------------------------------------|
| orderBy       | {string} `'slug'`                                    | Order the results by the provided property - ascending                      |
| orderBy       | {object} `{ field: 'slug', order: 'desc' }`          | Order the results by the provided `field` property in the `order` specified |
| orderBy       | {array} `['slug', { field: 'date', order: 'desc' }]` | Order the results by the all of the provided options                        |

> When using the array syntax option, a combination of strings and objects can be used - all ordering options will be applied in the order provided

### Filtering & Pagination

#### Real-time database

The following options are available and can be combined with one another:

| Property Name | Example Value Param | Usage                                                                                                      |
|---------------|---------------------|------------------------------------------------------------------------------------------------------------|
| limitToFirst  | {number} `5`        | Limit the maximum number of entries from the beginning of the ordered list of results.                     |
| limitToLast   | {number} `1`        | Limit the maximum number of entries from the end of the ordered list of results.                           |
| startAt       | {number} `1`        | Return items greater than or equal to the specified key or value, depending on the order-by method chosen. |
| endAt         | {number} `1`        | Return items less than or equal to the specified key or value, depending on the order-by method chosen.    |
| equalTo       | {number} `1`        | Return items equal to the specified key or value, depending on the order-by method chosen.                 |

?> **Tip:** You can combine the `startAt` and `endAt` options to get a range of entries.

#### Cloud Firestore

The following options are available and can be combined with one another:

| Property Name | Example Value Param                                                        | Usage                                                                             |
|---------------|----------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| filters       | {array of arrays} `[ ['state', '==', 'CA'], ['language', '==', 'en-US'] ]` | Apply any number of `where` clauses to your result set.                           |
| limit         | {number} `5`                                                               | Limit the number of document entries to be returned.                              |
| startAt       | {number or string} `1` or `'a'`                                            | Return items greater than or equal to the specified value - given value included. |
| startAfter    | {number or string} `1` or `'a'`                                            | Return items greater than the specified value - given value excluded              |
| endAt         | {number or string} `1` or `'z'`                                            | Return items less than or equal to the specified value - given value included.    |
| endBefore     | {number or string} `1` or `'z'`                                            | Return items less than the specified value - given value excluded.                |

?> **Tip:** Because Firestore's querying functionality is so powerful, you can specify any number of `filters` that will be applied in the order provided. See Firestore's [Compound Queries](https://firebase.google.com/docs/firestore/query-data/queries#compound_queries) to give you an idea of what is possible.

?> **Bonus Tip:** You can set multiple pagination options for all options except `limit` and `filters` by using an array - see [Multiple Cursor Conditions](https://firebase.google.com/docs/firestore/query-data/query-cursors#set_multiple_cursor_conditions).

### Sorting

#### Real-time database

Since the order of JavaScript object properties are not guaranteed and that most data in the Firebase database is stored as objects, Firebase does not guarantee the order of properties in the returned result set. When using the ordering methods, entries will always be sorted _ascending_ on the server and you can then use the `limitToFirst` or `limitToLast` methods to retrieve the relevant entries.

With that said, it does seem like modern browsers are sorting JavaScript object properties alphabetically - just be aware of it if you see any gremlins.

#### Cloud Firestore

See the [Ordering](/api-overview?id=ordering) section above for how you can specify the order of your results.

---

Next up: [Content](/content)
