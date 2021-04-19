import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/main.js',
  output: [
    {
      name: 'VueMapboxMap',
      file: 'dist/VueMapboxMap.umd.js',
      format: 'umd'
    },
    {
      name: 'VueMapboxMap',
      file: 'dist/VueMapboxMap.esm.js',
      format: 'es'
    },
    {
      name: 'VueMapboxMap',
      file: 'dist/VueMapboxMap.min.js',
      format: 'iife'
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    vue({
      css: true,
      compileTemplate: true
    }),
    buble({
      exclude: ['node_modules/**']
    }),
    terser()
  ]
}
