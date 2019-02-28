/**
 * Based on Gist found here: https://gist.github.com/mudge/5830382
 */
import { EventEmitter as Emitter } from '@flamelink/sdk-app-types'

export class EventEmitter implements Emitter.Emitter {
  private readonly events: Emitter.Events = {}

  public on(event: string, listener: Emitter.Listener): () => void {
    if (typeof this.events[event] !== 'object') {
      this.events[event] = []
    }

    this.events[event].push(listener)

    return () => this.off(event, listener)
  }

  public off(event: string, listener: Emitter.Listener): void {
    if (typeof this.events[event] !== 'object') {
      return
    }

    this.events[event] = this.events[event].filter(
      eventListener => eventListener !== listener
    )
  }

  public offAll(): void {
    Object.keys(this.events).forEach(
      (event: string) => (this.events[event] = [])
    )
  }

  public emit(event: string, ...args: any[]): void {
    if (typeof this.events[event] !== 'object') {
      return
    }

    ;[...this.events[event]].forEach(listener => listener.apply(this, args))
  }

  public once(event: string, listener: Emitter.Listener): () => void {
    const remove: () => void = this.on(event, (...args: any[]) => {
      remove()
      listener.apply(this, args)
    })
    return remove
  }
}
