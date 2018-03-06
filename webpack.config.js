const merge = require('webpack-merge')
const path = require('path')

const commonConfig = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist/')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: [ path.resolve(__dirname, './node_modules/') ],
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: [ path.resolve(__dirname, './node_modules/') ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  externals: {
    'mapbox-gl': 'mapbox gl',
    '@mapbox/mapbox-gl-geocoder': 'mapbox geocoder'
  },
  plugins: []
}

module.exports = [
  // for browser environment
  merge(commonConfig, {
    entry: path.resolve(__dirname, './src/plugin.js'),
    output: {
      filename: 'vue-mapbox-map.min.js',
      libraryTarget: 'window',
      library: 'VueMapboxMap'
    }
  }),
  // for node environments
  merge(commonConfig, {
    entry: path.resolve(__dirname, './src/VueMapboxMap.vue'),
    output: {
      filename: 'vueMapboxMap.js',
      libraryTarget: 'umd',
      library: 'VueMapboxMap',
      umdNamedDefine: true
    }
  })
]
