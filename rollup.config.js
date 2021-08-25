// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'public/dist',
    format: 'umd',
    name: 'floodfillPathfinder'
  },
  plugins: [typescript({
    lib: ['es2019', 'dom'],
    target: 'es5'
  })]
};