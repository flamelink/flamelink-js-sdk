import flamelink from '@flamelink/sdk-app';
import '@flamelink/sdk-settings';
import '@flamelink/sdk-schemas';
import '@flamelink/sdk-content';
import '@flamelink/sdk-navigation';
import '@flamelink/sdk-storage';
import '@flamelink/sdk-users';

console.warn(`
Warning! It is recommended to only import the modules required for your application.

Example:
import flamelink from 'flamelink/app'
import 'flamelink/<module>'

Where <module> can be one of 'content', 'navigation', 'storage', 'users' or 'settings'
`);

export default flamelink;
