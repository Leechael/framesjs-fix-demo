import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/*.ts'],
  outDir: './dist',
  dts: true,
  format: ['esm'],
  ignoreWatch: ['*.test.ts'],
  target: 'esnext',
  platform: 'browser',
  bundle: true,
  clean: true,
  treeshake: true,
  minify: true,
  metafile: true,
})

