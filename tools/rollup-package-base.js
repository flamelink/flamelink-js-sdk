import typescript from 'rollup-plugin-typescript2'
import resolveModule from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const pkgIsRequired = () => {
  console.error(`
  ERROR!

  It is required to provide the package's package.json object when retrieving the Rollup config.
  `)
  process.exit(1)
}

export default function getRollupConfig(pkg = pkgIsRequired()) {
  const plugins = [
    resolveModule(),
    typescript({
      typescript: require('typescript'),
      useTsconfigDeclarationDir: true
    }),
    commonjs()
  ]

  const external = Object.keys(Object.assign({}, pkg.dependencies))

  return [
    /**
     * Node.js Build
     */
    // {
    //   // input: './src/index.node.ts',
    //   input: './src/index.ts',
    //   output: [{ file: pkg.main, format: 'cjs' }],
    //   plugins,
    //   external
    // },
    /**
     * Browser Builds
     */
    {
      input: 'src/index.ts',
      output: [
        { dir: 'dist/cjs', format: 'cjs' },
        { dir: 'dist/esm', format: 'esm' }
      ],
      plugins,
      external
    },
    // CDN imports
    {
      input: 'src/rtdb/index.ts',
      output: { file: 'dist/rtdb/index.js', format: 'esm' },
      plugins,
      external
    },
    {
      input: 'src/cf/index.ts',
      output: { file: 'dist/cf/index.js', format: 'esm' },
      plugins,
      external
    },
    // CJS imports
    {
      input: 'src/rtdb/index.ts',
      output: { file: 'dist/cjs/rtdb/index.js', format: 'cjs' },
      plugins,
      external
    },
    {
      input: 'src/cf/index.ts',
      output: { file: 'dist/cjs/cf/index.js', format: 'cjs' },
      plugins,
      external
    },
    // ESM imports
    {
      input: 'src/rtdb/index.ts',
      output: { file: 'dist/esm/rtdb/index.js', format: 'esm' },
      plugins,
      external
    },
    {
      input: 'src/cf/index.ts',
      output: { file: 'dist/esm/cf/index.js', format: 'esm' },
      plugins,
      external
    }
  ]
}
