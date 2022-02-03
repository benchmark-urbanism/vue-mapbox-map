import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import vue from 'rollup-plugin-vue'

const rep = replace({
  values: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  preventAssignment: true,
})

export default [
  {
    input: 'src/main.js',
    external: ['vue'],
    output: {
      format: 'esm',
      file: 'dist/VueMapboxMap.esm.js',
    },
    plugins: [rep, commonjs(), nodeResolve(), vue()],
  },
  // SSR build.
  {
    input: 'src/main.js',
    external: ['vue'],
    output: {
      format: 'cjs',
      file: 'dist/VueMapboxMap.ssr.js',
      exports: 'default',
    },
    plugins: [rep, commonjs(), nodeResolve(), vue({ template: { optimizeSSR: true } })],
  },
  // Browser build.
  {
    input: 'src/main.js',
    output: {
      format: 'iife',
      file: 'dist/VueMapboxMap.min.js',
      exports: 'default',
      name: 'VueMapboxMap',
    },
    plugins: [rep, commonjs(), nodeResolve(), vue()],
  },
]
