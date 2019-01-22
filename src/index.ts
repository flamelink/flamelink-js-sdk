import flamelink from './modules/app'
import './modules/settings'

console.warn(`
Warning! It is recommended to only import the modules required for your application.

Example:
import flamelink from 'flamelink/app'
import 'flamelink/<module>'

Where <module> can be one of 'content', 'navigation', 'storage', 'users' or 'settings'
`)

export default flamelink