import flamelink from './app'
import './settings'
import './schemas'
import './content'
import './navigation'
import './storage'
import './users'

console.warn(`
[Flamelink] Warning!

Importing the whole Flamelink SDK is fine for development or quick prototyping,
but it is highly recommended that you only import the individual modules used
by your application when you use this SDK in production.

Instead of importing the whole SDK like this:

<script src="//cdn.jsdelivr.net/npm/flamelink>/dist/flamelink.js"></script>

Individual modules can be imported like this:

<script src="//cdn.jsdelivr.net/npm/flamelink/dist/flamelink-app>.js"></script>
<script src="//cdn.jsdelivr.net/npm/flamelink/dist/flamelink-<MODULE>.js"></script>

Where <MODULE> can be one of 'content', 'navigation', 'storage', 'users' or 'settings'
`)

export default flamelink
