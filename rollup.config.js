import commonjs from '@rollup/plugin-commonjs'
import buble from '@rollup/plugin-buble'
import vue from 'rollup-plugin-vue'

export default {
  input: 'src/main.js',
  output: [
    {
      name: 'VueMapboxMap',
      file: 'dist/VueMapboxMap.umd.js',
      format: 'umd',
      exports: 'default'
    },
    {
      name: 'VueMapboxMap',
      file: 'dist/VueMapboxMap.esm.js',
      format: 'esm',
      exports: 'default'
    },
    {
      name: 'VueMapboxMap',
      file: 'dist/VueMapboxMap.min.js',
      format: 'iife',
      exports: 'default'
    }
  ],
  plugins: [
    commonjs(),
    vue({
      css: true,
      compileTemplate: true
    }),
    buble({
      exclude: ['node_modules/**']
    })
  ]
}
