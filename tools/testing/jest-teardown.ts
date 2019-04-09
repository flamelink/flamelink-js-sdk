import { execSync } from 'child_process'
import debug from 'debug'
import { EOL } from 'os'
import { cleanup } from './firebase'

const stopEmulator = async (emulator: string) => {
  const dbug = debug(`teardown:${emulator}`)

  dbug('Stopping emulator process...')

  const emulatorPidBuffer = execSync(`pgrep -f ${emulator}`)
  const emulatorPIDs = emulatorPidBuffer.toString().split(EOL)

  if (emulatorPIDs.length) {
    emulatorPIDs.forEach(emulatorPID => {
      dbug(`Emulator PID: ${JSON.stringify(emulatorPID)}`)

      if (emulatorPID) {
        try {
          execSync(`kill -9 "${emulatorPID}"`)
          dbug(`Emulator process stopped`)
        } catch (err) {
          dbug(`Emulator process stopping failed: ${err.message}`)
        }
      }
    })
  }
}

const teardown = async (config: any) => {
  await cleanup()

  await Promise.all([
    stopEmulator('cloud-firestore-emulator'),
    stopEmulator('firebase-database-emulator')
  ])

  // Only force exit when not running in "watch" mode
  if (!config.watch && !config.watchAll) {
    // process.exit()
  }
}

export default teardown
