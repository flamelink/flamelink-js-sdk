import { execSync } from 'child_process'
import debug from 'debug'
import { EOL } from 'os'
import { cleanup } from './firebase'

const stopEmulator = async (emulator: string) => {
  const dbug = debug(`teardown:${emulator}`)

  try {
    const emulatorPidBuffer = execSync(`pgrep -f ${emulator}`)
    const emulatorPIDs = emulatorPidBuffer.toString().split(EOL).join(' ')

    dbug(`Stopping emulator processes: ${emulatorPIDs}`)

    if (emulatorPIDs) {
      try {
        execSync(`kill ${emulatorPIDs}`)
        dbug(`Emulator process stopped: ${emulatorPIDs}`)
      } catch (err) {
        dbug(
          `Emulator process stopping failed - ${emulatorPIDs}: ${err.message}`
        )
      }
    }
  } catch (err) {
    dbug(`Emulator process stopping failed: ${err.message}`)
  }
}

const teardown = async () => {
  await cleanup()

  await Promise.all([
    stopEmulator('cloud-firestore-emulator'),
    stopEmulator('firebase-database-emulator'),
  ])
}

export default teardown
