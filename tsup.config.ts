import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/*.ts'],
  outDir: './dist',
  dts: true,
  format: ['cjs'],
  ignoreWatch: ['*.test.ts'],
  target: 'esnext',
  platform: 'node',
  splitting: false,
  bundle: true,
  clean: true,
  treeshake: true,
  minify: true,
  metafile: true,
})

