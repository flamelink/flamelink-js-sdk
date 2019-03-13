# Settings

> All the methods that you would need to work with the Flamelink "Settings" module are available on the `app.settings` namespace.

---

On initialization of your Flamelink app instance, you should specify the environment you want to connect to, as well as the default locale. If no environment is specified, the default environment will be `"production"` and the locale will be `"en-US"`.

```javascript
const app = flamelink({
  ... other config ...
  env: 'production',
  locale: 'en-US'
})
```

---

## .setEnvironment()

If you want to set the environment to something else after instantiation, you can easily do so with the `setEnvironment()` method:

```javascript
app.settings.setEnvironment('staging')
  .then(env => console.log(`Your environment is set as "${env}"`)
  .catch(error => console.error('Something went wrong while setting the environment. Details:', error);
```

### Option properties

The `.setEnvironment()` method takes a single parameter

- `{String}` `env`: The environment you want to set.

### Return value

A `Promise` that resolves to the set environment `{String}` on success or will reject with an error if an unsupported environment is set.

---

## .getEnvironment()

To retrieve the currently selected environment, you can do so with the `getEnvironment()` method:

```javascript
app.settings.getEnvironment()
  .then(env => console.log(`Your environment is set as "${env}"`)
  .catch(error => console.error('Something went wrong while retrieving the environment. Details:', error);
```

### Option properties

The `.getEnvironment()` method takes no parameters

### Return value

A `Promise` that resolves to the currently set environment `{String}` on success.

---

## .setLocale()

If you want to set the locale to something else after instantiation, you can easily do so with the `setLocale()` method:

```javascript
app.settings.setLocale('en-GB')
  .then(locale => console.log(`Your locale is set as "${locale}"`)
  .catch(error => console.error('Something went wrong while setting the locale. Details:', error);
```

### Option properties

The `.setLocale()` method takes a single parameter

- `{String}` `locale`: The locale you want to set.

### Return value

A `Promise` that resolves to the set locale `{String}` on success or will reject with an error if an unsupported locale is set.

---

## .getLocale()

To retrieve the currently selected locale, you can do so with the `getLocale()` method:

```javascript
app.settings.getLocale()
  .then(locale => console.log(`Your locale is set as "${locale}"`)
  .catch(error => console.error('Something went wrong while retrieving the locale. Details:', error);
```

### Option properties

The `.getLocale()` method takes no parameters

### Return value

A `Promise` that resolves to the currently set locale `{String}` on success.

---

## .getGlobals()

To retrieve the global metadata for your project, you can do so with the `getGlobals()` method:

```javascript
const globals = await app.settings.getGlobals()
console.log(`Your project's global data: "${globals}"`)
```

### Option properties

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

#### .getGlobals() examples

_To retrieve only the `tagline` property_

```javascript
app.settings.getGlobals({ fields: ['tagline'] })
```

### Return value

A `Promise` that resolves to the globals `{Object}` on success or will reject with an error if the request fails.

---

## .subscribeGlobals()

This method is similar to the `app.settings.getGlobals()` method except that where the `.getGlobals()` method returns a `Promise` resolving to the once-off value, this method subscribes to the entries for real-time updates. A callback method should be supplied which will be called each time the data changes in your Firebase db.

*To subscribe to globals:*

```javascript
const unsubscribe = app.settings.subscribeGlobals({
  callback(error, globals) {
    if (error) {
      return console.error('Something went wrong while retrieving all the globals. Details:', error);
    }
    console.log('Globals:', globals);
  }
})

// later when you want to unsubscribe
unsubscribe()
```

### Option properties

| Type         | Property   | Required | Description                                                           |
|--------------|------------|----------|-----------------------------------------------------------------------|
| `{function}` | `callback` | required | Function called once when subscribed and when subscribed data changes |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

### .subscribeGlobals() examples

*To retrieve all of your blog posts, but only the `tagline`, `siteTitle` and `adminEmail` property for each individual post.*

```javascript
app.settings.subscribeGlobals({
  fields: [ 'tagline', 'siteTitle', 'adminEmail' ],
  callback: function(error, globals) {
    // Handle callback
  }
});
```

### Return value

This method returns its own `unsubscribe` method. Call this method to unsubscribe and remove the event listeners when they are no longer necessary to avoid memory leaks in your application.

---

## .getImageSizes()

To retrieve the list of different image sizes that are generated when an image is uploaded, you can do so with the `getImageSizes()` method:

```javascript
const imageSizes = await app.settings.getImageSizes()
console.log(`Your image sizes are set as "${imageSizes}"`)
```

### Option properties

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

#### .getImageSizes() examples

_To retrieve only the `width` property._

```javascript
app.settings.getImageSizes({ fields: ['width'] })
```

### Return value

A `Promise` that resolves to the image sizes `{Array}` on success or will reject with an error if the request fails.

---

## .getDefaultPermissionsGroup()

To retrieve the ID of the default Permissions Group, you can do so with the `getDefaultPermissionsGroup()` method:

```javascript
const permissionsGroup = await app.settings.getDefaultPermissionsGroup()
console.log(`Your default permissions groups is: "${permissionsGroup}"`)
```

### Option properties

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

### Return value

A `Promise` that resolves to the default permissions group `{Number}` on success or will reject with an error if the request fails.

---

> 🔥🔥🔥 **Pretty sure your keyboard's melting from all that hot code you're dropping** 🔥🔥🔥
