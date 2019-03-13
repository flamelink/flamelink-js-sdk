# Users

> All the methods that you would need to work with the "Users" Flamelink module is available on the `app.users` namespace.

!> **IMPORTANT:** Since Firebase currently has no way to retrieve a list of your users from the frontend, this module makes it possible to do this by reading the users stored in your database and not from the authentication section - this is important to understand.

---

## .get()

To retrieve all or a single user once.

This method does not _watch_ for real-time db changes, but is intended to retrieve your users once. If you are looking for real-time methods, take a look at the [`app.users.subscribe()`](/user?id=subscribe) method below.

*To get a single user:*

```javascript
const user = await app.users.get({ uid: '0SBeGh57kzS1jhdn9vSWmWsuyWz3' })
console.log('User:', user)
```

*To get all users:*

```javascript
const users = await app.users.get()
console.log('Users:', users)
```

### Option properties

| Type       | Property | Required | Description                                         |
|------------|----------|----------|-----------------------------------------------------|
| `{string}` | `uid`    | optional | The user's unique identifer as set in Firebase Auth |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

#### .get() examples

*To retrieve only the `email` and `displayName` from your user object.*

```javascript
app.users.get({ uid: '0SBeGh57kzS1jhdn9vSWmWsuyWz3', fields: ['email', 'displayName'] })
```

### Return value

A `Promise` that resolves to the user entry `{Object}` on success or will reject with an error if the request fails.

---

## .subscribe()

This method is similar to the `app.users.get()` method except that where the `.get()` method returns a `Promise` resolving to the once-off value, this method subscribes to a single user entry for real-time updates. A callback method should be supplied which will be called each time the data changes in your Firebase db.

If you are looking for retrieving data once, take a look at the [`app.users.get()`](/user?id=get) method above.

### Option properties

Parameters should be passed in the order of the following table. If an optional parameter, like the `options` are left out, the following parameter just moves left in its place.

| Type       | Property | Required | Description                                         |
|------------|----------|----------|-----------------------------------------------------|
| `{string}` | `uid`    | optional | The user's unique identifer as set in Firebase Auth |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

#### .subscribe examples

*To subscribe to a specific user:*

```javascript
const unsubscribe = app.users.subscribe({
  uid: '0SBeGh57kzS1jhdn9vSWmWsuyWz3',
  callback(error, user) {
    if (error) {
      return console.error('Something went wrong while retrieving the user. Details:', error)
    }
    console.log('The user object:', user)
  }
})

// later when you want to unsubscribe
unsubscribe()
```

*To subscribe to all users:*

```javascript
app.users.subscribe({
  callback: function(error, users) {
    if (error) {
      return console.error('Something went wrong while retrieving the users. Details:', error)
    }
    console.log('Users:', users)
  }
})
```

*To subscribe to the `child_changed` child event for a specific user entry/user:*

```javascript
app.users.subscribe({
  uid: '0SBeGh57kzS1jhdn9vSWmWsuyWz3',
  event: 'child_changed',
  callback(error, user) {
    if (error) {
      return console.error(
        'Something went wrong while retrieving the user changes. Details:',
        error
      )
    }
    console.log('The changes:', user)
  }
})
```

### Return value

This method returns its own `unsubscribe` method. Call this method to unsubscribe and remove the event listeners when they are no longer necessary to avoid memory leaks in your application.

---

## .addToDB()

This method can be used to add new users to your Firebase database.

> This method does not add the user to the [Firebase Authentication](https://firebase.google.com/docs/auth/) service.

```javascript
await app.users.addToDB({
  uid: '0SBeGh57kzS1jhdn9vSWmWsuyWz3',
  data: {
    displayName: 'Jane',
    email: 'jane@thesmiths.com',
    enabled: 'Yes',
    firstName: 'Jane',
    lastName: 'Smith',
    permissions: '1'
  }
})
console.log('Adding the user succeeded')
```

!> The `permissions` property for Cloud Firestore is a [Document Reference](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference), but if you provide the ID of the Flamelink Permission Group, the SDK will create the Document Reference for you. For RTDB, you can just set this property to the Permission Group ID.

?> It is important to note that this method will set the entry's `createdBy` and `createdDate` metadata for you.

### Option properties

| Type       | Property | Required | Description                                         |
|------------|----------|----------|-----------------------------------------------------|
| `{string}` | `uid`    | required | The user entry you want to set                      |
| `{object}` | `data`   | required | Payload object to set at the given user's reference |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

### Return value

A `Promise` that resolves when the new user entry is created or will reject with an error if the request fails.

---

## .updateInDB()

This method can be used to save data for a user without overwriting other child properties.

> This method does not update the user in the [Firebase Authentication](https://firebase.google.com/docs/auth/) service - only in the database.

```javascript
await app.users.updateInDB({ uid: '0SBeGh57kzS1jhdn9vSWmWsuyWz3', data: { displayName: 'Mr Jones' })
console.log('Updating the user entry succeeded')
```

?> It is important to note that this method will set the entry's `lastModifiedBy` and `lastModifiedDate` metadata for you.

### Option properties

| Type       | Property | Required | Description                                            |
|------------|----------|----------|--------------------------------------------------------|
| `{string}` | `uid`    | required | The user entry you want to update                      |
| `{object}` | `data`   | required | Payload object to update at the given user's reference |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

### Return value

A `Promise` that resolves when the payload is update or will reject with an error if the request fails.

---

## .removeFromDB()

This method can be used to remove a given user.

> This method does not remove the user from the [Firebase Authentication](https://firebase.google.com/docs/auth/) service - only from the database.

```javascript
await app.users.removeFromDB({ uid: '0SBeGh57kzS1jhdn9vSWmWsuyWz3' })
console.log('Removing the entry succeeded')
```

?> **Tip:** For the real-time database: an entry can also be removed by passing `null` as the data payload for `app.users.updateInDB()` methods.

### Option properties

| Type       | Property | Required | Description                       |
|------------|----------|----------|-----------------------------------|
| `{string}` | `uid`    | required | The user entry you want to remove |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

### Return value

A `Promise` that resolves when the entry is removed or will reject with an error if the request fails.

---

Next up: [Users](/users)

> 🔥🔥🔥 **Now we’re cooking with Fire…** 🔥🔥🔥
