module.exports = {
  chainWebpack: config => {
    config.externals({
      ...config.get('externals'),
      mapboxgl: 'mapbox-gl',
      MapboxGeocoder: '@mapbox/mapbox-gl-geocoder'
    })
  }
}
