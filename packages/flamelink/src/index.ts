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

---------------------------------- CommonJS ------------------------------------

const flamelink = require('flamelink/app')
require('flamelink/<module>')

------------------------------- EcmaScript Modules -----------------------------

import flamelink from 'flamelink/app'
import 'flamelink/<module>'

----------------------------------- TypeScript ---------------------------------

import flamelink from 'flamelink/app'
import 'flamelink/<module>'

--------------------------------------------------------------------------------

Where <module> can be one of 'content', 'navigation', 'storage', 'users' or 'settings'
`)

export default flamelink
