import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import { terser } from 'rollup-plugin-terser'

// see https://github.com/rollup/rollup-starter-lib/blob/buble/rollup.config.js
export default {
  input: 'src/main.js',
  external: [ 'mapbox-gl', '@mapbox/mapbox-gl-geocoder' ], // suppresses warnings about external modules
  output: [
    {
      name: 'VueMapboxMap',
      file: 'dist/VueMapboxMap.umd.js',
      format: 'umd', // browser friendly UMD build
      globals: {
        'mapbox-gl': 'mapboxgl',
        '@mapbox/mapbox-gl-geocoder': 'MapboxGeocoder'
      }
    },
    {
      name: 'VueMapboxMap',
      file: 'dist/VueMapboxMap.common.js',
      format: 'cjs', // CommonJS (for Node)
      globals: {
        'mapbox-gl': 'mapboxgl',
        '@mapbox/mapbox-gl-geocoder': 'MapboxGeocoder'
      }
    },
    {
      name: 'VueMapboxMap',
      file: 'dist/VueMapboxMap.esm.js',
      format: 'esm', // ES module (for bundlers)
      globals: {
        'mapbox-gl': 'mapboxgl',
        '@mapbox/mapbox-gl-geocoder': 'MapboxGeocoder'
      }
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    vue({
      css: true
    }),
    buble({
      exclude: ['node_modules/**']
    }),
    terser()
  ]
}
