const glob = require('glob')
const { defaults } = require('jest-config')

const pkgs = glob.sync(`./packages/*`).map(p => p.replace(/^\./, `<rootDir>`))

module.exports = {
  notify: !process.env.CI,
  verbose: true,
  // coverageReporters: [`json-summary`, `text`, `html`, `cobertura`],
  collectCoverageFrom: [
    '**/*.{js,ts}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/index.cdn.ts'
  ],
  roots: pkgs.filter(p => !p.endsWith('-types')).map(p => `${p}/src`),
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx']
}
