import { spawn, execSync } from 'child_process'
import { EOL } from 'os'
import * as path from 'path'
import debug from 'debug'

const FIRESTORE_EMULATOR_PORT = process.env.FIRESTORE_EMULATOR_PORT || '8080'
const DATABASE_EMULATOR_PORT = process.env.DATABASE_EMULATOR_PORT || '9000'

const isEmulatorRunning = (port: string): boolean => {
  try {
    execSync(`nc -zw1 localhost ${port}`)
    return true
  } catch (err) {
    return false
  }
}

const startEmulator = (
  emulator: string,
  args: string[],
  port: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const dbug = debug(`setup:${emulator}`)
    const logInfo = dbug.extend('stdout')
    const logError = dbug.extend('stderr')

    if (isEmulatorRunning(port)) {
      const emulatorPidBuffer = execSync(`lsof -ti :${port}`)
      const emulatorPID = emulatorPidBuffer.toString().split(EOL).join(' ')

      logInfo(`Emulator already running: ${emulatorPID}`)
      return resolve(emulatorPID)
    }

    const emulatorPath: string = execSync(
      `find ~/.cache/firebase/emulators -type f -name "${emulator}*.jar" | sort -r | head -n1`
    ).toString()
    const commandArgs: string[] = ['-jar']

    commandArgs.push(emulatorPath.replace(EOL, ''))

    if (args.length) {
      commandArgs.push(...args)
    }

    const child = spawn('java', commandArgs, {
      cwd: path.resolve(__dirname, '..', '..'),
      env: process.env,
      shell: true,
    })

    const interval = setInterval(() => {
      if (isEmulatorRunning(port)) {
        const emulatorPID = child.pid.toString()
        logInfo(`Emulator successfully started with PID: ${emulatorPID}`)
        clearInterval(interval)
        return resolve(emulatorPID)
      }
    }, 500)

    child.stdout.on('data', (data: string) => {
      logInfo(`${data}`)
    })

    child.stderr.on('data', (data: string) => {
      logError(`${data}`)
    })

    child.on('error', (err: Error) => {
      logError(`Emulator failed to start`)
      clearInterval(interval)
      reject(err)
    })

    child.on('close', (code: number) => {
      if (code) {
        dbug(`Emulator exited with code ${code}`)
      }
      clearInterval(interval)
    })
  })
}

const setup = async () => {
  await Promise.all([
    startEmulator(
      'cloud-firestore-emulator',
      ['--host=127.0.0.1', `--port=${FIRESTORE_EMULATOR_PORT}`],
      `${FIRESTORE_EMULATOR_PORT}`
    ),
    startEmulator(
      'firebase-database-emulator',
      [],
      `${DATABASE_EMULATOR_PORT}`
    ),
  ])
}

export default setup
