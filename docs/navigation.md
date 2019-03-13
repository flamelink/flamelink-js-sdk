# Navigation

> All the methods that you would need to work with the "Navigation" Flamelink module is available on the `app.nav` namespace.

---

## .get()

To retrieve all or a single navigation entry or menu once, ie. Give me the "Main Menu".

This method does not _watch_ for real-time db changes, but is intended to retrieve your menu once. If you are looking for real-time methods, take a look at the [`app.nav.subscribe()`](/navigation?id=subscribe) method below.

*To get a single navigation entry:*

```javascript
const menu = await app.nav.get({ navigationKey: 'mainMenu' })
console.log('Main menu:', menu)
```

*To get all navigation entries:*

```javascript
const menus = await app.nav.get()
console.log('Menus:', menus)
```

### Option properties

| Type       | Property        | Required | Description                                                                                             |
|------------|-----------------|----------|---------------------------------------------------------------------------------------------------------|
| `{string}` | `navigationKey` | optional | The navigation key for the entry you want to retrieve                                                   |
| `{string}` | `structure`     | optional | If set to `nested` or `tree` it will return all the items in a nested structure vs a flat list of items |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

#### .get() examples

*To retrieve only the `items` from your menu object.*

```javascript
app.nav.get({ navigationKey: 'mainMenu', fields: ['items'] })
```

*To retrieve your menu in a nested structure, specify either `nested` or `tree` as the `structure` option*

```javascript
app.nav.get({ navigationKey: 'mainMenu', structure: 'nested' })
```

?> **Tip:** Setting the `structure` to anything other than `nested` or `tree` will return a plain list of items

### Return value

A `Promise` that resolves to the navigation entry `{Object}` on success or will reject with an error if the request fails.

---

## .getItems()

To retrieve only the `items` array for a given menu/navigation entry reference.

```javascript
const items = await app.nav.getItems({ navigationKey: 'mainMenu' })
console.log('Menu items:', items)
```

> This method is simply a convenience method - a similar result can be achieved with the standard `app.nav.get()` method by adding the following options:

```javascript
const items = await app.nav.get('mainMenu', { fields: ['items'] })
console.log('Menu items:', items)
```

### Option properties

| Type       | Property        | Required | Description                                           |
|------------|-----------------|----------|-------------------------------------------------------|
| `{string}` | `navigationKey` | required | The navigation key for the items you want to retrieve |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

#### .getItems() examples

```javascript
app.nav.getItems({
  navigationKey: 'mainMenu',
  event: 'child_changed',
  fields: ['url', 'title', 'cssClass', 'children'],
  structure: 'tree'
})
```

### Return value

A `Promise` that resolves to the items on success or will reject with an error if the request fails.

---

## .subscribe()

This method is similar to the `app.nav.get()` method except that where the `.get()` method returns a `Promise` resolving to the once-off value, this method subscribes to a single navigation entry for real-time updates. A callback method should be supplied which will be called each time the data changes in your Firebase db.

If you are looking for retrieving data once, take a look at the [`app.nav.get()`](/navigation?id=get) method above.

*To subscribe to a specific navigation entry/menu:*

```javascript
const unsubscribe = app.nav.subscribe({
  navigationKey: 'mainMenu',
  callback(error, menu) {
    if (error) {
      return console.error('Something went wrong while retrieving the entry. Details:', error)
    }
    console.log('The menu object:', menu)
  }
})

// later when you want to unsubscribe
unsubscribe()
```

*To subscribe to all navigation entries:*

```javascript
app.nav.subscribe({
  callback: function(error, menus) {
    if (error) {
      return console.error('Something went wrong while retrieving the entries. Details:', error)
    }
    console.log('Menus:', menus)
  }
})
```

*To subscribe to the `child_changed` child event for a specific navigation entry/menu:*

```javascript
app.nav.subscribe({
  navigationKey: 'mainMenu',
  event: 'child_changed',
  callback(error, menu) {
    if (error) {
      return console.error(
        'Something went wrong while retrieving the navigation changes. Details:',
        error
      )
    }
    console.log('The changes:', menu)
  }
})
```

### Option properties

Parameters should be passed in the order of the following table. If an optional parameter, like the `options` are left out, the following parameter just moves left in its place.

| Type         | Property        | Required | Description                                                           |
|--------------|-----------------|----------|-----------------------------------------------------------------------|
| `{string}`   | `navigationKey` | optional | The navigation entry reference you want to retrieve (otherwise all)   |
| `{function}` | `callback`      | required | Function called once when subscribed and when subscribed data changes |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

#### .subscribe examples

*To retrieve only the `items` array.*

```javascript
app.nav.subscribe({
  navigationKey: 'mainMenu',
  fields: ['items'] ,
  callback: function(error, menu) {
    // Handle callback
  }
})
```

### Return value

This method returns its own `unsubscribe` method. Call this method to unsubscribe and remove the event listeners when they are no longer necessary to avoid memory leaks in your application.

---

## .add()

This method can be used to add new navigation entries.

```javascript
await app.nav.add({
  navigationKey: 'mainMenu',
  data: { title: 'Main Menu', items: [] }
})
console.log('Adding the menu succeeded')
```

?> It is important to note that this method will set the entry's `createdBy` and `createdDate` metadata for you.

### Option properties

| Type       | Property        | Required | Description                                          |
|------------|-----------------|----------|------------------------------------------------------|
| `{string}` | `navigationKey` | required | The navigation entry you want to set                 |
| `{object}` | `data`          | required | Payload object to set at the given entry's reference |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

### Return value

A `Promise` that resolves when the new navigation entry is created or will reject with an error if the request fails.

---

## .update()

This method can be used to save data for a single given navigation entry without overwriting other child properties.

```javascript
await app.nav.update({ navigationKey: 'mainMenu', data: { items: [] })
console.log('Updating the navigation entry succeeded')
```

?> It is important to note that this method will set the entry's `lastModifiedBy` and `lastModifiedDate` metadata for you.

### Option properties

| Type       | Property        | Required | Description                                             |
|------------|-----------------|----------|---------------------------------------------------------|
| `{string}` | `navigationKey` | required | The navigation entry you want to update                 |
| `{object}` | `data`          | required | Payload object to update at the given entry's reference |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

### Return value

A `Promise` that resolves when the payload is update or will reject with an error if the request fails.

---

## .remove()

This method can be used to remove a single given navigation entry.

```javascript
await app.nav.remove({ navigationKey: 'mainMenu' })
console.log('Removing the entry succeeded')
```

?> **Tip:** For the real-time database: an entry can also be removed by passing `null` as the data payload for `app.nav.update()` methods.

### Option properties

| Type       | Property        | Required | Description                             |
|------------|-----------------|----------|-----------------------------------------|
| `{string}` | `navigationKey` | required | The navigation entry you want to remove |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

### Return value

A `Promise` that resolves when the entry is removed or will reject with an error if the request fails.

---

Next up: [Users](/users)

> 🔥🔥🔥 **Now we’re cooking with Fire…** 🔥🔥🔥
