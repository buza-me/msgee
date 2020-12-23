import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default [
  // {
  //   input: 'src/main.ts',
  //   output: [
  //     {
  //       file: 'dist/bundle.umd.js',
  //       format: 'umd',
  //       name: 'msgee',
  //       exports: 'named',
  //       sourcemap: true,
  //     },
  //   ],
  //   plugins: [typescript()],
  // },
  {
    input: 'src/browser.ts',
    output: {
      file: 'dist/bundle.browser.umd.js',
      format: 'iife',
      name: 'msgee',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [typescript({ target: 'es5' }), terser()],
  },
];
