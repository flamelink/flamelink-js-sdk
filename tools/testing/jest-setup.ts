import { spawn, execSync } from 'child_process'
import * as path from 'path'
import debug from 'debug'

const startEmulator = (emulator: string, args: any[], successMsg: string) => {
  return new Promise((resolve, reject) => {
    const dbug = debug(emulator)
    const logInfo = dbug.extend('stdout')
    const logError = dbug.extend('stderr')

    const emulatorPath: any = execSync(
      `find ~/.cache/firebase/emulators -type f -name "${emulator}*.jar" | sort -r | head -n1`
    )
    const commandArgs: any[] = ['-jar']

    commandArgs.push(emulatorPath.toString().replace('\n', ''))

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

      if (data.includes(successMsg)) {
        resolve(child)
      }
    })

    child.stderr.on('data', (data: string) => {
      logError(`${data}`)
    })

    child.on('error', (err: any) => {
      logError(`child process failed to start`)
      reject(err)
    })

    child.on('close', (code: any) => {
      dbug(`child process exited with code ${code}`)
    })
  })
}

const setup = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cfEmulator, rtdbEmulator]: any[] = await Promise.all([
    startEmulator(
      'cloud-firestore-emulator',
      ['--host=127.0.0.1', '--port=8080'],
      'Dev App Server is now running'
    ),
    startEmulator('firebase-database-emulator', [], 'Listening on port 9000')
  ])

  // TODO: Seed data into DB's
}

export default setup
