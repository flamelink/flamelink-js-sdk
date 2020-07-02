import { EventEmitter as Emitter } from '@flamelink/sdk-app-types'
import { EventEmitter, PromiseEmitter } from '../index'

describe('utils', () => {
  describe('- Event Emitter', () => {
    let eventEmitter: Emitter.Emitter

    beforeEach(() => {
      eventEmitter = new EventEmitter()
    })

    it('should allow subscription to any event', () => {
      return new Promise((resolve) => {
        const testEvent = 'ice-cream'
        const testPayload = { flavour: 'vanilla' }
        eventEmitter.on(testEvent, (payload) => {
          expect(payload).toBe(testPayload)
          resolve()
        })

        eventEmitter.emit(testEvent, testPayload)
      })
    })

    it('should allow subscription to any event once', () => {
      return new Promise((resolve) => {
        const testEvent = 'ice-cream'
        const testPayload = { flavour: 'vanilla' }
        eventEmitter.once(testEvent, (payload) => {
          expect(payload).toBe(testPayload)
          resolve()
        })

        eventEmitter.emit(testEvent, testPayload)
      })
    })
  })

  describe('- Promise Emitter', () => {
    it('should allow subscription to any event while resolving like a Promise', async () => {
      const testPayload = { hey: 'ho' }
      const testEvent = 'greet'
      const promiseEmitter = new PromiseEmitter((resolve, reject, emitter) => {
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
