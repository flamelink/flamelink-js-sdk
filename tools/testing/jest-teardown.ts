import { execSync } from 'child_process'
import debug from 'debug'
import { cleanup } from './firebase'

const stopEmulator = async (emulator: string) => {
  const dbug = debug(`teardown:${emulator}`)

  dbug('Stopping emulator process...')

  const emulatorPidBuffer = execSync(`pgrep -f ${emulator}`)
  const emulatorPID = emulatorPidBuffer.toString().replace('\n', '')

  dbug(`Emulator PID: ${emulatorPID}`)

  if (emulatorPID) {
    try {
      execSync(`kill -9 ${emulatorPID}`)
      dbug(`Emulator process stopped`)
    } catch (err) {
      dbug(`Emulator process stopping failed: ${err.message}`)
    }
  }
}

const teardown = async () => {
  await cleanup()

  await Promise.all([
    stopEmulator('cloud-firestore-emulator'),
    stopEmulator('firebase-database-emulator')
  ])

  process.exit()
}

export default teardown
