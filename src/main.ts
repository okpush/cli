import { program } from 'commander'

import init from '@/commands/init'
import postCheckout from '@/commands/post-checkout'
import postCommit from '@/commands/post-commit'
import postRewrite from '@/commands/post-rewrite'
import preCommit from '@/commands/pre-commit'
import prePush from '@/commands/pre-push'
import config, { overrideServer } from '@/config'
import { setVerbose } from '@/logger'

export default function () {
  program
    .name('okpush')
    .description('git hook management tool')
    .option('-v, --verbose', 'verbose logging', () => setVerbose(1))
    .option('--server <server>', 'specify a custom okpush server', overrideServer)

  program
    .command('init')
    .description('Initialize okpush in a git repo')
    .argument('<email>', 'Your okpush email address. If ommitted, your git identity will be used.')
    .action(init)

  program.command('post-checkout').action(postCheckout)

  program.command('post-commit').action(postCommit)

  program.command('post-rewrite').action(postRewrite)

  program.command('pre-commit').action(preCommit)

  program.command('pre-push').action(prePush)

  program.parse()
  config.options = program.opts
}
