<script>
// imports are here instead of base, which means base can be used from Vuepress
import mapboxgl from 'mapbox-gl'
window.mapboxgl = mapboxgl
// eslint-disable-next-line
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
window.MapboxGeocoder = MapboxGeocoder
// eslint-disable-next-line
import VueMapboxMapBase from './VueMapboxMapBase.vue'

export default {
  name: 'VueMapboxMap',
  extends: VueMapboxMapBase
}
</script>
