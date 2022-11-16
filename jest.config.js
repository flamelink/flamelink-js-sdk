const glob = require('glob')

const pkgs = glob.sync(`./packages/*`).map((p) => p.replace(/^\./, `<rootDir>`))

module.exports = {
  notify: !process.env.CI,
  verbose: true,
  globalSetup: './tools/testing/jest-setup.ts',
  globalTeardown: './tools/testing/jest-teardown.ts',
  // coverageReporters: [`json-summary`, `text`, `html`, `cobertura`],
  collectCoverageFrom: [
    '**/*.{js,ts}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/index.cdn.ts',
  ],
  roots: pkgs.filter((p) => !p.endsWith('-types')).map((p) => `${p}/src`),
  modulePaths: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  testTimeout: 15000,
}
