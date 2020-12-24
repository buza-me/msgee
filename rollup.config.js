import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/browser.ts',
  output: {
    file: 'dist/bundle.browser.iife.js',
    format: 'iife',
    name: 'msgee',
    exports: 'named',
    sourcemap: true,
  },
  plugins: [typescript({ target: 'es5' }), terser()],
};
