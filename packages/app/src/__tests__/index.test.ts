'use strict'

import flamelink from '../'

describe('App Module', () => {
  test('should throw an error if not initialized with a Firebase app instance', () => {
    expect(() => flamelink({ firebaseApp: null })).toThrowError()
    expect(() => flamelink({ firebaseApp: {} })).not.toThrowError()
  })
})
