import { Hooks } from '@/hooks'
import { log } from '@/logger'
import { findGitRoot, readConfig } from '@/utils'

// npm postinstall command. like "install" but should never fail
export default async function () {
  try {
    const envCWD = process.env.INIT_CWD || process.env.PROJECT_CWD
    const root = findGitRoot(envCWD)
    const config = readConfig(root)
    if (!config) {
      return
    }
    const hooks = new Hooks(root)
    hooks.initAllHooks()
  } catch (e: any) {
    log('Failed to install okpush hooks. Please run `okpush install` manually.', e.message)
    // ignore
  }
}
