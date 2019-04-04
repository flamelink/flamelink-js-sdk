const { resolve } = require('path')

module.exports = function getJestConfig() {
  return {
    notify: !process.env.CI,
    verbose: true,
    globalSetup: resolve(__dirname, './testing/jest-setup.ts'),
    globalTeardown: resolve(__dirname, './testing/jest-teardown.ts'),
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
  }
}
