import esbuild from 'esbuild'
import tsPaths from 'esbuild-ts-paths'
import { nodeExternalsPlugin } from 'esbuild-node-externals'

const config = {
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/main.js',
  platform: 'node',
  target: 'node14',
  plugins: [tsPaths(), nodeExternalsPlugin()],
  format: 'esm',
}

const context = await esbuild.context(config)

if (process.argv.includes('--watch')) {
  await context.watch()
} else {
  await context.dispose()
}
