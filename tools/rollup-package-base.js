import typescript from 'rollup-plugin-typescript2';
import resolveModule from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const pkgIsRequired = () => {
  console.error(`
  ERROR!

  It is required to provide the package's package.json object when retrieving the Rollup config.
  `);
  process.exit(1);
};

export default function getRollupConfig(pkg = pkgIsRequired()) {
  const plugins = [
    resolveModule(),
    typescript({
      typescript: require('typescript')
    }),
    commonjs()
  ];

  const external = Object.keys(Object.assign({}, pkg.dependencies));

  return [
    /**
     * Node.js Build
     */
    {
      // input: './src/index.node.ts',
      input: './src/index.ts',
      output: [{ file: pkg.main, format: 'cjs' }],
      plugins,
      external
    },
    /**
     * Browser Builds
     */
    {
      input: './src/index.ts',
      output: [
        { file: pkg.browser, format: 'cjs' },
        { file: pkg.module, format: 'esm' }
      ],
      plugins,
      external
    }
  ];
}
