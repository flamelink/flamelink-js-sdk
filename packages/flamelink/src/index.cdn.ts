import flamelink from '../app/index'
import '../settings/index'
import '../schemas/index'
import '../content/index'
import '../navigation/index'
import '../storage/index'
import '../users/index'

console.warn(`
[Flamelink] Warning!

Importing the whole Flamelink SDK is fine for development or quick prototyping,
but it is highly recommended that you only import the individual modules used
by your application when you use this SDK in production.

Instead of importing the whole SDK like this:

<script src="//cdn.jsdelivr.net/npm/flamelink/flamelink.js"></script>

Individual modules can be imported like this:

<script src="//cdn.jsdelivr.net/npm/flamelink/flamelink-app.js"></script>
<script src="//cdn.jsdelivr.net/npm/flamelink/flamelink-<MODULE>.js"></script>

Where <MODULE> can be one of 'content', 'navigation', 'storage', 'users' or 'settings'
`)

export default flamelink
