'use strict'

import app from '../'

test('should export a factory function to create a new flamelink app instance', () => {
  expect(typeof app).toBe('function')
})
