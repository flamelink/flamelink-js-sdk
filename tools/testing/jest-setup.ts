import { spawn, execSync } from 'child_process'
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

const startEmulator = (emulator: string, args: any[], port: string) => {
  return new Promise((resolve, reject) => {
    const dbug = debug(`setup:${emulator}`)
    const logInfo = dbug.extend('stdout')
    const logError = dbug.extend('stderr')

    if (isEmulatorRunning(port)) {
      logInfo(`Emulator already running`)
      return resolve()
    }

    const emulatorPath: any = execSync(
      `find ~/.cache/firebase/emulators -type f -name "${emulator}*.jar" | sort -r | head -n1`
    ).toString()
    const commandArgs: any[] = ['-jar']

    commandArgs.push(emulatorPath.replace('\n', ''))

    if (args.length) {
      commandArgs.push(...args)
    }

    const child = spawn('java', commandArgs, {
      cwd: path.resolve(__dirname, '..', '..'),
      env: process.env,
      shell: true
    })

    child.stdout.on('data', (data: string) => {
      logInfo(`${data}`)

      if (isEmulatorRunning(port)) {
        resolve(child)
      }
    })

    child.stderr.on('data', (data: string) => {
      logError(`${data}`)
    })

    child.on('error', (err: any) => {
      logError(`Emulator failed to start`)
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
  await Promise.all([
    startEmulator(
      'cloud-firestore-emulator',
      ['--host=127.0.0.1', '--port=8080'],
      '8080'
    ),
    startEmulator('firebase-database-emulator', [], '9000')
  ])
}

export default setup
