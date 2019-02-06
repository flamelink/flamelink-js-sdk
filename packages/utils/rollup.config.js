import pkg from './package.json'
import getRollupConfig from '../../tools/rollup-package-base'

const config = getRollupConfig(pkg)

// Filter out any RTDB or CF specific entry points
export default config.filter(x => !x.input.match(/\/(rtdb|cf)\//))
