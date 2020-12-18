import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/main.ts',
    output: [
      {
        file: 'dist/bundle.umd.js',
        format: 'umd',
        name: 'msgee',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [typescript(), terser()],
  },
  {
    input: 'src/browser.ts',
    output: {
      file: 'dist/bundle.browser.umd.js',
      format: 'umd',
      name: 'msgee',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [typescript(), terser()],
  },
];
