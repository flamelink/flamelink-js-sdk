# Contributing

> We love pull requests from everyone. By participating in this project, you
> agree to abide by our [code of conduct](CODE_OF_CONDUCT.md).

When contributing to this repository, please first discuss the change you wish to make via an issue before making a change.

## Overview

The Flamelink JavaScript SDK is set up as a [Lerna][lerna] monorepo with all of the separate modules in the `packages` directory. Lerna makes it easy to work with all these packages by running commands from the root of the project. If you are not familiar with Lerna, it is worth a quick read through their docs to get a feel for it.

Each package in the `packages` directory gets published to NPM separately under the `@flamelink` organization scope. All but one, the `flamelink` package. This package is special and can be seen as the public API for this SDK. The `flamelink` package is the one that users will install and use and we discourage anyone from using any of the scoped packages directly. The scoped packages are used internally by the `flamelink` package.

In this SDK, we also opted to take on more complexity on the development or maintenance side, in favour of a simpler interface for our end users. This is especially clear if you look at the generated files in the `packages/flamelink` directory. A lot of the files are generated directly in that directory instead of in a `dist` directory. This is so that the imports for our users can look nicer, for example: `import "flamelink/content"` instead of `import "flamelink/dist/content"`.

The modules that are relevant to both Cloud Firestore and the Realtime Database can be imported separately or combined. In fact, the whole SDK can be imported by using `import flamelink from "flamelink"` but this will download a lot of unused code in the end user's app, but might give them a nice way to quickly play with the SDK. For this reason, they can choose to only import what they need.

At a minimum, a user always needs to import the shared `app` module:

```javascript
import flamelink from 'flamelink/app'
```

If a user wants to only use the `content` module, they can either import the whole module with:

```javascript
import flamelink from 'flamelink/app'
import 'flamelink/content'
```

or specifically for their choice of database (Cloud Firestore or Realtime Database):

```javascript
import flamelink from 'flamelink/app'
import 'flamelink/cf/content' // or import 'flamelink/rtdb/content'
```

This is possible for all the modules and gives our users the ultimate control over their bundle size.

## Setup

### Fork Repository

Fork, then clone the repo (replace `your-username`):

```sh
git clone git@github.com:your-username/flamelink-js-sdk.git
```

### Install Dependencies

This project uses `yarn`. It is similar to `npm`. See [here][yarn] if you need to first set up `yarn` on your local machine.

```sh
yarn install
```

### Bootstrapping

For Lerna to create the symlinks between all the local `packages`, you need to first run the following command:

```sh
yarn bootstrap
```

### Run Build

Before you start, run the build locally to make sure everything is working fine:

```sh
yarn build
```

This process might take some time.

### Run Tests

It is a good idea to first run the tests to make sure they are all passing on your local machine before you make any changes.

This SDK uses the Firebase database emulators for the tests so you need to install those first:

```sh
yarn install-emulators
```

The Firebase emulators have a hard dependency on at least Java 1.8, so make sure you have the JDK installed on your local machine. On MacOS I used homebrew which seems to work fine:

```sh
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk8
```

Take note of the homebrew output in your terminal because you might need to run additional commands like setting up a symlink for the `java` command to work.

Now run the unit or integration tests with:

```sh
yarn test:unit
```

```sh
yarn test:integration
```

### Make your changes

#### Run dev build

Run the development build that will watch for changes as you work.

```sh
yarn dev
```

#### Setup local playground

The best way to work with the SDK locally when fixing a bug, etc. is to create a test case that reproduces the issue. Proper TDD flow.

TDD is not always possible or the easiest way to simply play around with all the different use cases of the SDK. In that case, either create a separate repo (or plain directory) on your local machine or create a `.playground` directory at the root of this repo. Inside your playground repo/directory you can create any files necessary to test the SDK locally. For instance, you can create a `test.ts` file to test the SDK using TypeScript (`ts-node test.ts`). Or you can create an `index.html` file if you want to test the `<script>` tag functionality.

##### Link to local SDK

If you've set up a `test.ts` file and you want to `import flamelink from 'flamelink'` you will run into problems because your Node.js process would not know where to get this package. You also don't want to install the dependency via NPM or Yarn because that will pull the last published version of the SDK and not the local one you are working with.

To work with your local version, you will create a symlink. Yarn makes this very easy. Browse to the `packages/flamelink` directory in the `flamelink-js-sdk` repo and run the following command:

```sh
yarn link
```

Then go to the root of your testing repo and run the following command to complete the link to the local `flamelink` package:

```sh
yarn link flamelink
```

If you want to remove these links again, you can run the following commands respectively:

```sh
yarn unlink
```

and

```sh
yarn unlink flamelink
```

### Test again

If possible, write some tests for your changes and make sure all tests are still passing.

```sh
yarn test:unit && yarn test:integration
```

### Create Pull Request

Push to your fork and [submit a pull request][pr].

At this point you're waiting on us. We like to at least comment on pull requests
within three business days (and, typically, one business day). We may suggest
some changes or improvements or alternatives.

Some things that will increase the chance that your pull request is accepted:

- Write tests.
- Follow the project's current code style.
- Write a [good commit message][commit].

## Other useful commands

There are a number of other useful run-scripts set up in the `package.json` file in the root directory, so feel encouraged to browse around.

### Clean up

If you want to quickly remove all `node_modules` from all the packages, simply run:

```sh
yarn clean
```

We also expose a generic `lerna` run-script to make it easy to run any of the other Lerna commands using the locally installed binary.

```sh
yarn lerna <the-command>
```

For example:

```sh
yarn lerna info
```

## For Maintainers

### Release new version

After a pull request has been successfully merged, a decision needs to be made how the change should be deployed.

It is important to use Lerna's mechanisms to version and publish any changes. It makes it easy to strictly follow [semver][semver] when versioning the changes.

#### Versioning

You do not need to manually update any versions. Lerna will update anything that needs to update during the publishing process described below.

#### Release

This plugin is distributed via NPM and is available at: https://www.npmjs.com/package/flamelink

> To publish to NPM, you need to have the relevant permissions. Speak to another maintainer to add you to the Flamelink organization on NPM if needed.

After ensuring you are logged into NPM (`$ npm login`) with the relevant permissions, you can publish the new version.

Make sure you are in the root directory of the plugin and then run:

```sh
yarn publish:next
```

This will start an interactive CLI process that will guide you through the publish process including selecting the new version for the changes made since the last release.

Currently, this command will publish to NPM with the `next` tag. The plugin will then be available to install via `npm add flamelink@next`.

When this SDK graduates out of `alpha`, the following command can be used for general releases:

```sh
yarn publish:latest
```

> After committing the version change, remember to push the changes back up to the origin.

[yarn]: https://classic.yarnpkg.com/en/docs/getting-started
[lerna]: https://lerna.js.org/
[gatsby-source-plugin]: https://www.gatsbyjs.org/docs/creating-a-source-plugin/
[pr]: https://github.com/flamelink/flamelink-js-sdk/compare/
[commit]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
[semver]: https://semver.org/
