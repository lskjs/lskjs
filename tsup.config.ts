import type { Options } from 'tsup';

const env = process.env.NODE_ENV;

export const tsup: Options = {
  splitting: false,
  clean: true,
  dts: true,
  sourcemap: true,
  format: ['cjs', 'esm'], // 'iife',
  outExtension: ({ format }) => ({ js: format === 'esm' ? '.mjs' : '.js' }),
  minify: env === 'production',
  bundle: env === 'production',
  skipNodeModulesBundle: true,
  metafile: env === 'development',
  // entryPoints: ['src/index.ts'],
  watch: env === 'development',
  target: 'esnext',
  outDir: 'lib',
  platform: 'node',
  entry: ['src/**/*.ts'], // include all files under src
};
