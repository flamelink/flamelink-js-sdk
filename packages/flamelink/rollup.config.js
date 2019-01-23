import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import resolveModule from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import gzipPlugin from 'rollup-plugin-gzip';
import { compress } from 'brotli';
import pkg from './package.json';

import appPkg from '../app/package.json';
import settingsPkg from '../settings/package.json';

const LIBRARY_NAME = 'flamelink';

const modulePkgs = {
  app: appPkg,
  settings: settingsPkg
};

const external = Object.keys(pkg.dependencies || {});

const plugins = [
  resolveModule(),
  typescript({
    typescript: require('typescript')
  }),
  commonjs()
];

const umdPlugins = [
  ...plugins,
  terser(),
  gzipPlugin(),
  gzipPlugin({
    customCompression: content => compress(Buffer.from(content)),
    fileName: '.br'
  })
];

const moduleNames = [
  'app',
  'content',
  'navigation',
  'schemas',
  'settings',
  'storage',
  'users'
];

export default [
  /**
   * Global UMD build
   */
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/flamelink.js',
      format: 'umd',
      name: LIBRARY_NAME,
      esModule: false,
      sourcemap: true
    },
    plugins: umdPlugins
  },

  /**
   * Node.js Build
   */
  {
    // input: 'src/index.node.ts',
    input: 'src/index.ts',
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

  ...moduleNames.map(moduleName => ({
    input: `src/${moduleName}/index.ts`,
    output: {
      file: `dist/flamelink-${moduleName}.js`,
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
          'Cannot instantiate flamelink-${moduleName} - be sure to load flamelink-app.js first.'
        );
      }`
    },
    external: ['@flamelink/sdk-app'],
    plugins: umdPlugins
  }))

  // ...moduleNames.map(moduleName => {
  //   const modulePkg = modulePkgs[moduleName];

  //   return {
  //     input: `src/${moduleName}/index.ts`,
  //     output: [
  //       {
  //         file: modulePkg.module,
  //         format: 'esm'
  //       },
  //       {
  //         file: modulePkg.main,
  //         format: 'cjs'
  //       }
  //     ]
  //   };
  // })
];
