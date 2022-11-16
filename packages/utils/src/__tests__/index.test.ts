import { EventEmitter as Emitter } from '@flamelink/sdk-app-types'
import { EventEmitter, PromiseEmitter } from '../index'

describe('utils', () => {
  describe('- Event Emitter', () => {
    let eventEmitter: Emitter.Emitter

    beforeEach(() => {
      eventEmitter = new EventEmitter()
    })

    it('should allow subscription to any event', (done) => {
      const testEvent = 'ice-cream'
      const testPayload = { flavour: 'vanilla' }
      eventEmitter.on(testEvent, (payload) => {
        expect(payload).toBe(testPayload)
        done()
      })

      eventEmitter.emit(testEvent, testPayload)
    })

    it('should allow subscription to any event once', (done) => {
      const testEvent = 'ice-cream'
      const testPayload = { flavour: 'vanilla' }
      eventEmitter.once(testEvent, (payload) => {
        expect(payload).toBe(testPayload)
        done()
      })

      eventEmitter.emit(testEvent, testPayload)
    })
  })

  describe('- Promise Emitter', () => {
    it('should allow subscription to any event while resolving like a Promise', async () => {
      const testPayload = { hey: 'ho' }
      const testEvent = 'greet'

      expect.assertions(1)

      const promiseEmitter = new PromiseEmitter((resolve, _reject, emitter) => {
        emitter.emit(testEvent, testPayload)
        resolve()
      })

      promiseEmitter.on(testEvent, (payload) => {
        expect(payload).toBe(testPayload)
      })

      await promiseEmitter
    })
  })
})
