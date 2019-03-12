module.exports = {
  chainWebpack: config => {
    // do not bundle external dependencies
    config.externals({
      ...config.get('externals'),
      'mapbox-gl': 'mapboxgl',
      '@mapbox/mapbox-gl-geocoder': 'MapboxGeocoder'
    })
  }
}
