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

Instead of doing this:
const flamelink = require('flamelink')

Do this instead:
const flamelink = require('flamelink/app')
require('flamelink/<module>')

Where <module> can be one of 'content', 'navigation', 'storage', 'users' or 'settings'
`)

export default flamelink
