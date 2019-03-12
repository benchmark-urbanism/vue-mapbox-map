<template>
  <div ref='mapboxMapDiv'></div>
</template>

<script>
// imports are here instead of base, which means base can be used from Vuepress
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import VueMapboxMapBase from './VueMapboxMapBase.vue'

export default {
  name: 'VueMapboxMap',
  extends: VueMapboxMapBase
}
</script>
