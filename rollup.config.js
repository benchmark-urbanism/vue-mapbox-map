import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import pkg from './package.json' // import names from package to reduce errors

// see https://github.com/rollup/rollup-starter-lib/blob/buble/rollup.config.js
export default {
  input: 'src/index.js',
  external: [ 'mapbox-gl', '@mapbox/mapbox-gl-geocoder' ], // suppresses warnings about external modules
  output: [
    {
      name: 'VueMapboxMap',
      file: pkg.browser,
      format: 'umd',
      globals: {
        'mapbox-gl': 'mapboxgl',
        '@mapbox/mapbox-gl-geocoder': 'MapboxGeocoder'
      }
    },
    {
      name: 'VueMapboxMap',
      file: pkg.main,
      format: 'cjs',
      globals: {
        'mapbox-gl': 'mapboxgl',
        '@mapbox/mapbox-gl-geocoder': 'MapboxGeocoder'
      }
    },
    {
      name: 'VueMapboxMap',
      file: pkg.module,
      format: 'es',
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
    })
  ]
}
