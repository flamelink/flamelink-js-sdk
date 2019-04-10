import { execSync } from 'child_process'
import debug from 'debug'
import { EOL } from 'os'
import { cleanup } from './firebase'

const stopEmulator = async (emulator: string, pid: string) => {
  const dbug = debug(`teardown:${emulator}`)

  dbug(`Stopping emulator process with PID: ${pid}...`)

  const emulatorPidBuffer = execSync(`pgrep -f ${emulator}`)
  const emulatorPIDs = emulatorPidBuffer
    .toString()
    .split(EOL)
    .join(' ')

  dbug(`Emulator processes: ${emulatorPIDs}`)

  // if (pid) {
  //   try {
  //     // execSync(`kill -9 "${pid}"`)
  //     execSync(`kill ${pid}`)
  //     dbug(`Emulator process stopped: ${pid}`)
  //   } catch (err) {
  //     dbug(`Emulator process stopping failed - ${pid}: ${err.message}`)
  //   }
  // }
  if (emulatorPIDs) {
    try {
      // execSync(`kill -9 "${emulatorPIDs}"`)
      execSync(`kill ${emulatorPIDs}`)
      dbug(`Emulator process stopped: ${emulatorPIDs}`)
    } catch (err) {
      dbug(`Emulator process stopping failed - ${emulatorPIDs}: ${err.message}`)
    }
  }

  // const emulatorPidBuffer = execSync(`pgrep -f ${emulator}`)
  // const emulatorPIDs = emulatorPidBuffer.toString().split(EOL)

  // if (emulatorPIDs.length) {
  //   emulatorPIDs.forEach(emulatorPID => {
  //     dbug(`Emulator PID: ${JSON.stringify(emulatorPID)}`)

  //     if (emulatorPID) {
  //       try {
  //         execSync(`kill -9 "${emulatorPID}"`)
  //         dbug(`Emulator process stopped`)
  //       } catch (err) {
  //         dbug(`Emulator process stopping failed: ${err.message}`)
  //       }
  //     }
  //   })
  // }
}

const teardown = async () => {
  await cleanup()

  await Promise.all([
    stopEmulator(
      'cloud-firestore-emulator',
      global.__flamelink_emulators.firestorePID
    ),
    stopEmulator(
      'firebase-database-emulator',
      global.__flamelink_emulators.firebasePID
    )
  ])
}

export default teardown
