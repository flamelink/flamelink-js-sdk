import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const external = Object.keys(pkg.dependencies || {});

const plugins = [
  typescript({
    typescript: require('typescript')
  })
];

const flamelinkModules = [
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
  // TODO: Need separate UMD files for app and each module, eg. 'flamelink-app.js', 'flamelink-content.js', etc
  {
    input: {
      index: 'src/index.ts',
      app: 'src/modules/app.ts',
      settings: 'src/modules/settings.ts'
    },
    output: [
      {
        dir: 'dist/esm',
        format: 'esm'
      },
      {
        dir: 'dist/cjs',
        format: 'cjs'
      }
    ],
    plugins,
    external
  }
];
