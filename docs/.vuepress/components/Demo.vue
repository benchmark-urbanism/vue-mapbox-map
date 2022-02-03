<template lang="pug">
#map-container
ClientOnly
  VueMapboxMap(
    :map='mapInstance'
    :lng='lng'
    :lat='lat'
    :zoom='zoom'
    :pitch='pitch'
    :bearing='bearing'
  )
div
  p Zoom: {{ zoom.toLocaleString() }}
  p Pitch: {{ pitch.toLocaleString() }}
  p Bearing: {{ bearing.toLocaleString() }}
</template>

<script setup>
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import mapboxgl from 'mapbox-gl'

import VueMapboxMap from '../../../src/components/VueMapboxMap.vue'

import 'mapbox-gl/dist/mapbox-gl.css'

const { x, y } = useWindowScroll()
const { width, height } = useWindowSize()
const offset = computed(() => {
  let off = y.value / (2000 - height.value)
  return off > 1 ? 1 : off
})
const scene = reactive({
  lng: -73.982,
  lat: 40.768,
  baseZoom: 13,
  basePitch: 20,
  baseBearing: 0,
})
const zoom = computed(() => baseZoom + offset.value * 5)
const pitch = computed(() => basePitch + offset.value * 30)
const bearing = computed(() => baseBearing + offset.value * 100)
mapboxgl.accessToken =
  'pk.eyJ1Ijoic2hvbmdvbG9sbyIsImEiOiJja2lubnc4ZWcxNTI2MzJxajhsa3NxcWtxIn0.gg7J040GTgBNook7aNclMQ'
const mapInstance = ref(null)
onMounted(() => {
  mapInstance.value = markRaw(
    new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [scene.lng, scene.lat],
      zoom: scene.baseZoom,
      pitch: scene.basePitch,
      bearing: scene.baseBearing,
      interactive: false,
    })
  )
})
</script>

<style scoped lang="postcss">
#map-container {
  position: relative;
  margin: 20px 0 20px 0;
  width: 100%;
  height: 400px;
  background-color: lightgray;
}
</style>
