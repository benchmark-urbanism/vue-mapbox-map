import VueMapboxMap from './VueMapboxMap.vue'

module.exports = {
  install: function (Vue, options) {
    Vue.component('mapbox-map', VueMapboxMap)
  }
}
