import typescript from 'rollup-plugin-typescript2'
import resolveModule from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'

const plugins = [
  resolveModule(),
  typescript({
    typescript: require('typescript'),
  }),
  commonjs(),
]

const external = Object.keys(Object.assign({}, pkg.dependencies))

export default [
  /**
   * Node.js Build
   */
  {
    input: './src/index.ts',
    output: [{ file: pkg.main, format: 'cjs' }],
    plugins,
    external,
  },
  /**
   * Browser Builds
   */
  {
    input: './src/index.ts',
    output: [
      { file: pkg.browser, format: 'cjs' },
      { file: pkg.module, format: 'esm' },
    ],
    plugins,
    external,
  },
]
