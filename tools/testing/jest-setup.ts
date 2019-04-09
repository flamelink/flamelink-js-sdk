import { spawn, execSync } from 'child_process'
import { EOL } from 'os'
import * as path from 'path'
import debug from 'debug'

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
  args: any[],
  port: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const dbug = debug(`setup:${emulator}`)
    const logInfo = dbug.extend('stdout')
    const logError = dbug.extend('stderr')

    if (isEmulatorRunning(port)) {
      const emulatorPidBuffer = execSync(`lsof -ti :${port}`)
      const emulatorPID = emulatorPidBuffer
        .toString()
        .split(EOL)
        .join(' ')

      logInfo(`Emulator already running: ${emulatorPID}`)
      return resolve(emulatorPID)
    }

    const emulatorPath: any = execSync(
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
      shell: true
    })

    const interval = setInterval(() => {
      if (isEmulatorRunning(port)) {
        logInfo(`Emulator successfully started`)
        clearInterval(interval)
        return resolve(child.pid.toString())
      }
    }, 500)

    child.stdout.on('data', (data: string) => {
      logInfo(`${data}`)
    })

    child.stderr.on('data', (data: string) => {
      logError(`${data}`)
    })

    child.on('error', (err: any) => {
      logError(`Emulator failed to start`)
      clearInterval(interval)
      reject(err)
    })

    child.on('close', (code: any) => {
      if (code) {
        dbug(`Emulator exited with code ${code}`)
      }
    })
  })
}

const setup = async () => {
  const [firestorePID, firebasePID] = await Promise.all([
    startEmulator(
      'cloud-firestore-emulator',
      ['--host=127.0.0.1', '--port=8080'],
      '8080'
    ),
    startEmulator('firebase-database-emulator', [], '9000')
  ])

  global.__flamelink_emulators = { firestorePID, firebasePID }
}

export default setup
