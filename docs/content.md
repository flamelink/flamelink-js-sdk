# Content

> All the methods that you need to work with the "Content" Flamelink module is available on the `app.content` namespace.

!> **Content Type** and **Schema Key** is used interchangeably within these docs.

---

## .get()

To either retrieve a single content entry or all the entries for a given content type once, ie. Give me all my "Blog Posts".

This method does not _watch_ for real-time db changes, but is intended to retrieve your content once. If you're looking for real-time methods, take a look at the [`app.content.subscribe()`](/content?id=subscribe) method below.

_To get all entries for a specific content type:_

```javascript
const blogPost = await app.content.get({ schemaKey: 'blogPosts' })
console.log('All the blog posts:', blogPosts)
```

_or to get an individual entry for that type (with options):_

```javascript
const blogPost = await app.content.get({
  schemaKey: 'blogPosts',
  entryId: '1502966447501',
  fields: ['title', 'description']
})
console.log('Individual blog post with options applied:', blogPost)
```

### Option properties

| Type              | Property    | Required | Description                                               |
| ----------------- | ----------- | -------- | --------------------------------------------------------- |
| `string`          | `schemaKey` | optional | The content type reference you want to retrieve           |
| `string`          | `entryId`   | optional | The entry ID for given content type                       |
| `string[]`        | `fields`    | optional | Pluck specific fields from results                        |
| `boolean / array` | `populate`  | optional | Populate reference fields with related entries            |
| `string`          | `event`     | optional | RTDB only. The Firebase child event to retrieve data for. |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

#### .get() examples

_Retrieve all of your blog posts, but only the `title`, `description` and `image` property for each individual post_

```javascript
app.content.get({
  schemaKey: 'blogPosts',
  fields: ['title', 'description', 'image']
})
```

_Retrieve all of your blog posts and populate the `category` property for each individual post_

```javascript
app.content.get({
  schemaKey: 'blogPosts',
  populate: ['category']
})
```

*Retrieve all of your blog posts and populate *everything* for each individual post*

```javascript
app.content.get({
  schemaKey: 'blogPosts',
  populate: true
})
```

_find all your blog posts and populate the `category` relational field along with the `banner-image` media field, but only return the `id`, `name`, `icon` and `section` for each category assigned to each blog post. Additionally, each `category` might be related to a `section`, so populate that as well._

```javascript
app.content.get({
  schemaKey: 'blogPosts',
  populate: [
    {
      field: 'category',
      fields: ['id', 'name', 'icon', 'section'],
      populate: ['section']
    },
    {
      field: 'banner-image'
    }
  ]
})
```

_Retrieve all your blog posts for a given `category` that is **not a relational** field value using filters._
_Read more about [using filters and ordering data](https://flamelink.github.io/flamelink-js-sdk/#/api-overview?id=sorting-filtering-and-ordering-data)_

```javascript
app.content.get({
  schemaKey: 'blogPosts',
  populate: true,
  filters: [['category', '==' 'Some Category']]
})
```

_Retrieve all your blog posts for a given **relational** `category` field value using filters._
_Read more about [using filters and ordering data](https://flamelink.github.io/flamelink-js-sdk/#/api-overview?id=sorting-filtering-and-ordering-data)_

```javascript
// get the category by name
app.content
  .get({
    schemaKey: 'category',
    filters: [['name', '==', 'Super Awesome']]
  })
  .then(category => {
    // get the category reference
    for (let id in category) {
      app.content
        .ref(['category', id]) // [schemaKey, entryId]
        .get()
        .then(categoryRef => {
          // get the blog posts filtered on the category reference
          app.content
            .get({
              schemaKey: 'blogPosts',
              populate: true,
              filters: [['category', '==', categoryRef.docs[0].ref]]
            })
            .then(blogPosts => console.log('All the blog posts:', blogPosts))
            .catch(error =>
              console.error(
                'Something went wrong retrieving posts for the given category',
                error
              )
            )
        })
        .catch(error =>
          console.error(
            'Something went wrong retrieving the category ref',
            error
          )
        )
      break
    }
  })
  .catch(error =>
    console.error('Something went wrong retrieving a category', error)
  )
```

_Retrieve only blog posts for entries that were updated_

```javascript
app.content.get({
  schemaKey: 'blogPosts',
  event: 'child_changed'
})
```

### Return value

A `Promise` that resolves to the reference `{Object}` on success or will reject with an error if the request fails.

---

## .getByField()

_To retrieve a single entry once for a given field and value, ie. Give me my blog post with the `slug` `"my-famous-blog-post"`._

```javascript
const blogPost = await app.content.getByField({
  schemaKey: 'blogPosts',
  field: 'slug',
  value: 'my-famous-blog-post'
})
```

> This method is just a convenient way of querying your data, but the same can be achieved with the standard `app.content.get()` method by adding the following options:

```javascript
const blogPost = await app.content.get({
  schemaKey: 'blogPosts',
  orderByChild: 'slug',
  equalTo: 'my-famous-blog-post'
})
```

### Option properties

| Type       | Property    | Required | Description                                      |
| ---------- | ----------- | -------- | ------------------------------------------------ |
| `{string}` | `schemaKey` | required | The content type reference you want to retrieve  |
| `{string}` | `field`     | required | The name of the field to check the value against |
| `{string}` | `value`     | required | The value of the given field to find             |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

All options available to the `app.content.get()` method, except for the already applied `orderByChild` and `equalTo`, is available for this method.

#### .getByField() examples

```javascript
app.content.getByField({
  schemaKey: 'blogPosts',
  field: 'slug',
  value: 'my-blog-post-title',
  event: 'child_changed',
  fields: ['title', 'description', 'image', 'category'],
  populate: [
    {
      field: 'category',
      fields: ['id', 'name', 'icon', 'section'],
      populate: ['section']
    }
  ]
})
```

### Return value

A `Promise` that resolves to the reference `{Object}` on success or will reject with an error if the request fails.

---

## .subscribe()

This method is similar to the `app.content.get()` method except that where the `.get()` method returns a `Promise` resolving to the once-off value, this method subscribes to either a single content entry or all the entries for real-time updates. A callback method should be supplied which will be called each time the data changes in your Firebase db.

If you are looking for retrieving data once, take a look at the [`app.content.get()`](/content?id=get) method above.

_To subscribe to all entries for a specific content type:_

```javascript
const unsubscribe = app.content.subscribe({
  schemaKey: 'blogPosts',
  callback(error, blogPosts) {
    if (error) {
      return console.error(
        'Something went wrong while retrieving all the content. Details:',
        error
      )
    }
    console.log('All the blog posts:', blogPosts)
  }
})

// later when you want to unsubscribe
unsubscribe()
```

_To subscribe to all your blog posts for a given `category` that is **not a relational** field value using filters_
_Read more about [using filters and ordering data](https://flamelink.github.io/flamelink-js-sdk/#/api-overview?id=sorting-filtering-and-ordering-data)_

```javascript
const unsubscribe = app.content.subscribe({
  schemaKey: 'blogPosts',
  populate: true,
  filters: ['category', '==' 'Some Category']
  callback(error, blogPosts) {
    if (error) {
      return console.error(
        'Something went wrong while retrieving all the content. Details:',
        error
      )
    }
    console.log('All the blog posts for "Some Category":', blogPosts)
  }
})

// later when you want to unsubscribe
unsubscribe()
```

_To subscribe to all your blog posts for a given relational `category` field value using filters_
_Read more about [using filters and ordering data](https://flamelink.github.io/flamelink-js-sdk/#/api-overview?id=sorting-filtering-and-ordering-data)_

```javascript
let unsubscribe = () => {}

// get the category by name
app.content
  .get({
    schemaKey: 'category',
    filters: [['name', '==', 'Super Awesome']]
  })
  .then(category => {
    // get the category reference
    for (let id in category) {
      app.content
        .ref(['category', id]) // [schemaKey, entryId]
        .get()
        .then(categoryRef => {
          // subscribe to the blog posts filtered on the category reference
          unsubscribe = app.content.subscribe({
            schemaKey: 'blogPosts',
            populate: true,
            filters: [['category', '==', categoryRef.docs[0].ref]],
            callback(error, blogPosts) {
              if (error) {
                return console.error(
                  'Something went wrong while retrieving all the content. Details:',
                  error
                )
              }
              console.log('All the blog posts for "Some Category":', blogPosts)
            }
          })
        })
        .catch(error =>
          console.error(
            'Something went wrong retrieving the category ref',
            error
          )
        )
      break
    }
  })
  .catch(error =>
    console.error('Something went wrong retrieving a category', error)
  )

// later when you want to unsubscribe
unsubscribe()
```

_To subscribe to the `child_added` child event for a specific content type:_

```javascript
const unsubscribe = app.content.subscribe({
  schemaKey: 'blogPosts',
  event: 'child_added',
  callback(error, blogPost) {
    if (error) {
      return console.error(
        'Something went wrong while retrieving the content that got added. Details:',
        error
      )
    }
    console.log('The blog post that got added:', blogPost)
  }
})

// later when you want to unsubscribe
unsubscribe()
```

_To subscribe to an individual entry for that type (with options):_

```javascript
const unsubscribe = app.content.subscribe({
  schemaKey: 'blogPosts',
  entryId: '1502966447501',
  fields: ['title', 'description'],
  callback(error, blogPost) {
    if (error) {
      return console.error(
        'Something went wrong while retrieving the entry. Details:',
        error
      )
    }
    console.log('Individual blog post with options applied:', blogPost)
  }
})

// later when you want to unsubscribe
unsubscribe()
```

### Option properties

| Type         | Property    | Required | Description                                                           |
| ------------ | ----------- | -------- | --------------------------------------------------------------------- |
| `{string}`   | `schemaKey` | optional | The content type reference you want to retrieve                       |
| `{string}`   | `entryId`   | optional | The entry ID/reference for given content type                         |
| `{function}` | `callback`  | required | Function called once when subscribed and when subscribed data changes |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

### .subscribe() examples

_To retrieve all of your blog posts, but only the `title`, `description` and `image` property for each individual post._

```javascript
app.content.subscribe({
  schemaKey: 'blogPosts',
  fields: ['title', 'description', 'image'],
  callback: function(error, blogPosts) {
    // Handle callback
  }
})
```

_To retrieve all of your blog posts and populate the `category` property for each individual post._

```javascript
app.content.subscribe({
  schemaKey: 'blogPosts',
  populate: ['category'],
  callback: function(error, blogPosts) {
    // Handle callback
  }
})
```

### Return value

This method returns its own `unsubscribe` method. Call this method to unsubscribe and remove the event listeners when they are no longer necessary to avoid memory leaks in your application.

---

## .add()

This method can be used to add a new content entry.

```javascript
app.content.add({
  schemaKey: 'blogPosts',
  data: { title: 'new-title' }
})
```

?> It is important to note that this method will set the entry's `id` as well as the `createdBy` and `createdDate` metadata for you.

Adding a new entry with media

```javascript
app.storage.upload(imageAsFile).then(fileObject => {
  app.storage.fileRef(fileObject.id).then(imageRef => {
    app.content.add({
      schemaKey: 'blogPost',
      data: {
        title: 'New Post',
        image: [imageRef],
      },
    }).then(result => {
      console.log(result)
    }).catch(error => console.error('Error adding entry', error))
  }).catch(error => console.error('Error retrieving image reference', error))
}).catch(error => console.error('Error uploading file', error));
```

### Option properties

| Type       | Property    | Required | Description                                              |
| ---------- | ----------- | -------- | -------------------------------------------------------- |
| `{string}` | `schemaKey` | required | The content type reference for the entry you want to set |
| `{object}` | `data`      | required | Payload object for the new entry                         |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

### Return value

A `Promise` that resolves when the entry is added or will reject with an error if the request fails.

---

## .update()

This method can be used to save data for a single given entry without overwriting other child properties.

!> This method can only be used to update the data for an individual entry at a time and not to update all the entries for a given content type.

```javascript
app.content.update({
  schemaKey: 'blogPosts',
  entryId: '1502966447501',
  data: {
    title: 'new-title', // single field value
    'seo.description': 'some description', // single nested field value
    author: {
      // the entire field - this will overwrite/replace the entire author object
      firstName: 'John'
    }
  }
})
```

?> It is important to note that this method will set the entry's `id` as well as the `lastModifiedBy` and `lastModifiedDate` metadata for you.

Updating an existing entry with media

```javascript
app.storage.upload(imageAsFile).then(fileObject => {
  app.storage.fileRef(fileObject.id).then(imageRef => {
    app.content.update({
      schemaKey: 'blogPost',
      entryId: 'xxxxxxxxxxxx'
      data: {
        title: 'Updated Title',
        image: [imageRef],
      },
    }).then(result => {
      console.log(result)
    }).catch(error => console.error('Error updating entry', error))
  }).catch(error => console.error('Error retrieving image reference', error))
}).catch(error => console.error('Error uploading file', error));
```

### Option properties

| Type       | Property    | Required | Description                                                 |
| ---------- | ----------- | -------- | ----------------------------------------------------------- |
| `{string}` | `schemaKey` | required | The content type reference for the entry you want to update |
| `{string}` | `entryId`   | required | The entry ID/reference for given content type to update     |
| `{object}` | `data`      | required | Payload object to update at the given entry's reference     |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

### Return value

A `Promise` that resolves when the payload is update or will reject with an error if the request fails.

---

## .remove()

This method can be used to remove a single given entry.

```javascript
app.content.remove({
  schemaKey: 'blogPosts',
  entryId: '1502966447501'
})
```

?> **Tip:** For the Realtime database, an entry can also be removed by passing `null` as the payload to the `app.content.update()` method.

### Option properties

| Type       | Property    | Required | Description                                                 |
| ---------- | ----------- | -------- | ----------------------------------------------------------- |
| `{string}` | `schemaKey` | required | The content type reference for the entry you want to remove |
| `{string}` | `entryId`   | required | The entry ID/reference for given content type to remove     |

See the [API overview](/api-overview?id=fields) for details regarding some of these options.

### Return value

A `Promise` that resolves when the entry is removed or will reject with an error if the request fails.

---

> 🔥🔥🔥 **Are your fingers Flaming yet? They should be!** 🔥🔥🔥

Next up: [Navigation/Menus](/navigation)
