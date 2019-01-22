import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

import appPkg from '../app/package.json';
import settingsPkg from '../settings/package.json';

const modulePkgs = {
  app: appPkg,
  settings: settingsPkg
};

const external = Object.keys(pkg.dependencies || {});

const plugins = [
  typescript({
    typescript: require('typescript')
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
  // Global UMD build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/flamelink.js',
      format: 'umd',
      name: pkg.name,
      esModule: false
    },
    plugins: [...plugins, terser()]
  },
  // TODO: Split entry point out for NodeJS vs browser (if necessary)
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.module,
        format: 'esm'
      },
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.browser,
        format: 'cjs'
      }
    ],
    plugins,
    external
  },
  ...moduleNames.map(moduleName => ({
    input: `src/modules/${moduleName}.ts`,
    output: {
      file: `dist/flamelink-${moduleName}.js`,
      format: 'umd',
      // name: ? look at what Firebase does for this so we don't create another global for each
      esModule: false
    }
  })),
  ...moduleNames.map(moduleName => {
    const modulePkg = modulePkgs[moduleName];

    return {
      input: `src/modules/${moduleName}.ts`,
      output: [
        {
          file: modulePkg.module,
          format: 'esm'
        },
        {
          file: modulePkg.main,
          format: 'cjs'
        }
      ]
    };
  })
];
