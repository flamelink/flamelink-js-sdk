# Users

> All the methods that you would need to work with the "Users" Flamelink module is available on the `app.users` namespace.

---

## .get()

To either retrieve a single user entry or all the users once, ie. Give me my "Product Categories" user.

This method does not _watch_ for real-time db changes, but is intended to retrieve your user once. If you are looking for real-time methods, take a look at the [`app.users.subscribe()`](/users?id=subscribe) method below.

_To get a specific user:_

```javascript
app.users
  .get('product-categories')
  .then(user => console.log('Product Categories Schema:', user))
  .catch(error =>
    console.error(
      'Something went wrong while retrieving the user. Details:',
      error
    )
  )
```

_or to get all users (with options):_

```javascript
app.users
  .get({ fields: ['title', 'description', 'fields'] })
  .then(allSchemas =>
    console.log('All users with options applied:', allSchemas)
  )
  .catch(error =>
    console.error(
      'Something went wrong while retrieving the entry. Details:',
      error
    )
  )
```

### Option properties

| Type   | Property  | Required | Description                                          |
|--------|-----------|----------|------------------------------------------------------|
| String | `userKey` | optional | The user database key/reference you want to retrieve |
| Object | `options` | optional | Additional options                                   |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

?> **Tip:** Leave the user key out or set to `null` to retrieve all users

#### Available Options

The following options can be specified when retrieving your user(s):

##### Fields

- `fields` **{Array}** - A list of fields to be plucked from an/each user entry.

_Example_

To retrieve the `'product-categories'` user, but only the `title`, `description` and `fields` properties.

```javascript
app.users.get('product-categories', {
  fields: ['title', 'description', 'fields']
})
```

##### Event

- `event` **{String}** - The Firebase child event to retrieve data for. By default, the event is `value`, which is used for retrieving the entire user object at the given reference(s) path.

_Example_

The allowed child event options are: `value`, `child_added`, `child_changed`, `child_removed` and `child_moved`.

> To read more about these events, see the [Firebase docs](https://firebase.google.com/docs/database/web/lists-of-data#listen_for_child_events).

```javascript
app.users.get('product-categories', { event: 'child_changed' })
```

### Return value

A `Promise` that resolves to the reference `{Object}` on success or will reject with an error if the request fails.

---

## .subscribe()

This method is similar to the `app.users.get()` method, except that where the `.get()` method returns a `Promise` resolving to the once-off value, this method subscribes to either a single user entry or all the users for real-time updates. A callback method should be passed as the last argument which will be called each time the data changes in your Firebase db.

If you are looking for retrieving data once, take a look at the [`app.users.get()`](/users?id=get) method above.

_To subscribe to a specific individual user:_

```javascript
app.users.subscribe('product-categories', function(error, user) {
  if (error) {
    return console.error(
      'Something went wrong while retrieving all the user. Details:',
      error
    )
  }
  console.log('The product categories user:', user)
})
```

_To subscribe to the `child_added` child event for a specific user:_

```javascript
app.users.subscribe('product-categories', { event: 'child_added' }, function(
  error,
  user
) {
  if (error) {
    return console.error(
      'Something went wrong while retrieving the user property that got added. Details:',
      error
    )
  }
  console.log('The product categories user that got added:', user)
})
```

_To subscribe to all users (with options):_

```javascript
app.users.subscribe({ fields: ['title', 'description', 'fields'] }, function(
  error,
  users
) {
  if (error) {
    return console.error(
      'Something went wrong while retrieving the users. Details:',
      error
    )
  }
  console.log('All users with options applied:', users)
})
```

?> **HOT TIP:** If you are using [RxJS Observables](http://reactivex.io/rxjs/) and you don't like callbacks, turn this `subscribe` method into an **Observable** like this:

```javascript
const getSchemaObservable = Rx.Observable.bindCallback(app.users.subscribe)
getSchemaObservable('product-categories').subscribe()
```

### Option properties

Parameters should be passed in the order of the following table. If an optional parameter, like the `options` are left out, the following parameter just moves in its place.

| Type     | Property   | Required | Description                                                           |
|----------|------------|----------|-----------------------------------------------------------------------|
| String   | `userKey`  | optional | The user database key or reference you want to retrieve               |
| Object   | `options`  | optional | Additional options                                                    |
| Function | `callback` | required | Function called once when subscribed and when subscribed data changes |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

#### Available Options

The following options can be specified when retrieving your user data:

##### Fields

- `fields` **{Array}** - A list of fields to be plucked from users.

_Example_

To retrieve your product categories user, but only the `title`, `description` and `fields` property.

```javascript
app.users.subscribe(
  'product-categories',
  { fields: ['title', 'description', 'fields'] },
  function(error, user) {
    // Handle callback
  }
)
```

##### Event

- `event` **{String}** - The Firebase child event to retrieve data for. By default, the event is `value`, which is used for retrieving the entire user object at the given reference(s) path.

_Example_

The allowed child event options are: `value`, `child_added`, `child_changed`, `child_removed` and `child_moved`.

> To read more about these events, see the [Firebase docs](https://firebase.google.com/docs/database/web/lists-of-data#listen_for_child_events).

```javascript
app.users.subscribe({ event: 'child_changed' }, function(error, users) {
  // Handle callback
})
```

### Return value

This method has no return value, but makes use of an [error-first callback](https://www.google.com/search?q=error-first+callback&oq=javascript+error-first+callback) function that should be passed as the last argument.

---

## .unsubscribe()

This method is used to unsubscribe from previously subscribed user updates or other child events. It is the equivalent of Firebase's `.off()` method and taking the Flamelink data structures into consideration.

_To unsubscribe from a specific user:_

```javascript
app.users.unsubscribe('product-categories')
```

_To unsubscribe from the `child_removed` event for a specific user:_

```javascript
app.users.unsubscribe('product-categories', 'child_removed')
```

_To unsubscribe from all events for the users:_

```javascript
app.users.unsubscribe()
```

### Option properties

All parameters are optional and calling this method without options will unsubscribe from all callbacks.

| Type   | Property  | Required | Description                                                    |
|--------|-----------|----------|----------------------------------------------------------------|
| String | `userKey` | optional | The user key or reference to unsubscribe from                  |
| String | `event`   | optional | The child event to unsubscribe from (see allowed child events) |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

### Return value

This method has no return value.

---

## .set()

> This is a more advanced API method, that for most use cases will not be necessary. Only use it if you know what you are doing. If you mess this up, you might break your CMS. It is strongly advised to use backups.

This method can be used to save data and overwrite the whole object for a given user.

!> **FIRE RISK WARNING:** Using `set()` overwrites all the data for the specified user(s), including any child nodes. For this reason, this method can only be used to update an individual user and not all users at once. It is generally safer to use the `app.users.update()` method to patch only the specified properties. **With great power comes great responsibility, Peter Parker.**

```javascript
app.users.set('product-categories', { id: 'product-categories', title: 'Product Categories', ...All other properties... })
  .then(() => console.log('Setting the user data succeeded'))
  .catch(() => console.error('Something went wrong while setting the user data.'));
```

?> It is important to note that this method will set the entry's `id` as well as the `createdBy` and `createdDate` metadata for you.

### Option properties

| Type   | Property  | Required | Description                                            |
|--------|-----------|----------|--------------------------------------------------------|
| String | `userKey` | required | The user key or reference for the user you want to set |
| Object | `payload` | required | Payload object to set at the given user reference      |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

### Return value

A `Promise` that resolves when the payload is set or will reject with an error if the request fails.

---

## .update()

> **FIRE RISK WARNING:** This is a more advanced API method, that for most use cases will not be necessary. Only use it if you know what you are doing. If you mess this up, you might break your CMS. It is strongly advised to use backups.

This method can be used to save data for a single given user without overwriting other child properties.

!> This method can only be used to update the data for an individual user at a time and not to update all the users.

```javascript
app.users.update('product-categories', { id: 'product-categories', title: 'Product Categories', ...Optional other properties... })
  .then(() => console.log('Updating the user succeeded'))
  .catch(() => console.error('Something went wrong while updating the user.'));
```

?> It is important to note that this method will set the entry's `id` as well as the `lastModifiedBy` and `lastModifiedDate` metadata for you.

### Option properties

| Type   | Property  | Required | Description                                               |
|--------|-----------|----------|-----------------------------------------------------------|
| String | `userKey` | required | The user key or reference for the user you want to update |
| Object | `updates` | required | Payload object to update at the given user's reference    |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

### Return value

A `Promise` that resolves when the payload is update or will reject with an error if the request fails.

---

## .remove()

> **FIRE RISK WARNING:** This is a more advanced API method, that for most use cases will not be necessary. Only use it if you know what you are doing. If you mess this up, you might break your CMS. It is strongly advised to use backups.

This method can only be used to remove an individual user.

```javascript
app.users
  .remove('product-categories')
  .then(() => console.log('Removing the user succeeded'))
  .catch(() => console.error('Something went wrong while removing the user.'))
```

?> **Tip:** A user can also be removed by passing `null` as the payload to the `app.users.set()` or `app.users.update()` methods. Be careful!

### Option properties

| Type   | Property  | Required | Description                         |
|--------|-----------|----------|-------------------------------------|
| String | `userKey` | required | The user key or reference to remove |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

### Return value

A `Promise` that resolves when the user is removed or will reject with an error if the request fails.

---

Next up: [Storage/Media](/storage)

> 🔥🔥🔥 **Feel the Burn!!! Feel the Deep Burn!!** 🔥🔥🔥
