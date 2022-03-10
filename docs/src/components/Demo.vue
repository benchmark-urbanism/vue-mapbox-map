<template lang="pug">
.bg-dark-grey.py-3.rounded.border-mid-grey
  .text-center
    div Scroll to see some map action!
  #map-container.my-3.w-full.bg-theme(style='height: 400px; min-height: 400px; max-height: 400px')
  .flex.justify-center
    .flex.flex-initial.px-2
      .flex-initial.self-end.px-2.font-medium Zoom:
      .flex-initial.self-end.px-2.text-xl {{ zoom.toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) }}
    .flex.flex-initial.px-2
      .flex-initial.self-end.px-2.font-medium Pitch:
      .flex-initial.self-end.px-2.text-xl {{ pitch.toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) }}
    .flex.flex-initial.px-2
      .flex-initial.self-end.px-2.font-medium Bearing:
      .flex-initial.self-end.px-2.text-xl {{ bearing.toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) }}
  VueMapboxMap(
    :map='mapInstance'
    :lng='scene.lng'
    :lat='scene.lat'
    :zoom='zoom'
    :pitch='pitch'
    :bearing='bearing'
  )
</template>

<script setup>
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import mapboxgl from 'mapbox-gl'
import { computed, markRaw, onMounted, onUnmounted, reactive, ref } from 'vue'
import VueMapboxMap from '../../../src/components/VueMapboxMap.vue'

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
const zoom = computed(() => scene.baseZoom + offset.value * 5)
const pitch = computed(() => scene.basePitch + offset.value * 30)
const bearing = computed(() => scene.baseBearing + offset.value * 100)
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
