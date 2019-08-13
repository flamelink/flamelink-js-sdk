import { resolve } from 'path'
import { terser } from 'rollup-plugin-terser'
import typescriptPlugin from 'rollup-plugin-typescript2'
import typescript from 'typescript'
import resolveModule from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import gzipPlugin from 'rollup-plugin-gzip'
import { compress } from 'brotli'
import flatMap from 'lodash/flatMap'
import pkg from './package.json'

import appPkg from './app/package.json'
import contentPkg from './content/package.json'
import navigationPkg from './navigation/package.json'
import schemasPkg from './schemas/package.json'
import settingsPkg from './settings/package.json'
import storagePkg from './storage/package.json'
import usersPkg from './users/package.json'

const LIBRARY_NAME = 'flamelink'

const modulePkgs = {
  app: appPkg,
  content: contentPkg,
  navigation: navigationPkg,
  schemas: schemasPkg,
  settings: settingsPkg,
  storage: storagePkg,
  users: usersPkg
}

const external = Object.keys(pkg.dependencies || {})

const plugins = [
  resolveModule(),
  typescriptPlugin({
    typescript
  }),
  commonjs()
]

const umdPlugins = [
  ...plugins,
  terser(),
  gzipPlugin(),
  gzipPlugin({
    customCompression: content => compress(Buffer.from(content)),
    fileName: '.br'
  })
]

const moduleNames = [
  'app',
  'content',
  'navigation',
  'schemas',
  'settings',
  'storage',
  'users'
]

export default [
  /**
   * Global UMD build
   */
  {
    input: 'src/index.cdn.ts',
    output: {
      file: 'flamelink.js',
      format: 'umd',
      name: LIBRARY_NAME,
      esModule: false,
      sourcemap: true
    },
    inlineDynamicImports: true,
    plugins: umdPlugins
  },

  /**
   * App UMD build
   */
  {
    input: 'app/index.ts',
    output: {
      file: 'flamelink-app.js',
      format: 'umd',
      name: LIBRARY_NAME,
      esModule: false,
      sourcemap: true
    },
    inlineDynamicImports: true,
    plugins: umdPlugins
  },

  /**
   * Node.js Build
   */
  {
    input: 'src/index.node.ts',
    output: [{ file: pkg.main, format: 'cjs' }],
    plugins,
    external
  },

  /**
   * Browser Builds
   */
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.browser, format: 'cjs' },
      { file: pkg.module, format: 'esm' }
    ],
    plugins,
    external
  },

  /**
   * UMD build for each module
   */
  ...moduleNames
    .filter(moduleName => moduleName !== 'app')
    .map(moduleName => ({
      input: `${moduleName}/index.cdn.ts`,
      output: {
        file: `flamelink-${moduleName}.js`,
        format: 'umd',
        name: LIBRARY_NAME,
        sourcemap: true,
        extend: true,
        esModule: false,
        globals: {
          '@flamelink/sdk-app': LIBRARY_NAME
        },
        /**
         * use iife to avoid below error in the old Safari browser
         * SyntaxError: Functions cannot be declared in a nested block in strict mode
         * https://github.com/firebase/firebase-js-sdk/issues/1228
         *
         */
        intro: `try {(function() {`,
        outro: `}).apply(this, arguments); } catch(err) {
        console.error(err);
        throw new Error(
          'Cannot instantiate "flamelink-${moduleName}.js" - be sure to load flamelink-app.js first.'
        );
      }`
      },
      inlineDynamicImports: true,
      external: ['@flamelink/sdk-app'],
      plugins: umdPlugins
    })),

  ...moduleNames.map(moduleName => {
    const modulePkg = modulePkgs[moduleName]

    return {
      input: `${moduleName}/index.ts`,
      output: [
        {
          file: resolve(moduleName, modulePkg.module),
          format: 'esm'
        },
        {
          file: resolve(moduleName, modulePkg.main),
          format: 'cjs'
        }
      ],
      plugins,
      external
    }
  }),

  ...flatMap(['schemas', 'content'], moduleName => {
    const modulePkg = modulePkgs[moduleName]

    return [
      {
        input: `cf/${moduleName}/index.ts`,
        output: [
          {
            file: resolve('cf', moduleName, modulePkg.module),
            format: 'esm'
          },
          {
            file: resolve('cf', moduleName, modulePkg.main),
            format: 'cjs'
          }
        ],
        plugins,
        external
      },
      {
        input: `rtdb/${moduleName}/index.ts`,
        output: [
          {
            file: resolve('rtdb', moduleName, modulePkg.module),
            format: 'esm'
          },
          {
            file: resolve('rtdb', moduleName, modulePkg.main),
            format: 'cjs'
          }
        ],
        plugins,
        external
      }
    ]
  })
]
