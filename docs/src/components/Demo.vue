<template lang="pug">
div.bg-dark-grey.py-3.rounded.border-mid-grey
  div.text-center
    div Scroll to see some map action!
  div#map-container
  div.flex.justify-center
    div.pair
      div.label Zoom:
      div.info {{ zoom.toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) }}
    div.pair
      div.label Pitch:
      div.info {{ pitch.toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) }}
    div.pair
      div.label Bearing:
      div.info {{ bearing.toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) }}
  VueMapboxMap(
    :bearing='bearing',
    :lat='scene.lat',
    :lng='scene.lng',
    :map='mapInstance',
    :pitch='pitch',
    :zoom='zoom'
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

<style lang="postcss">
#map-container {
  @apply my-3 h-[400px] max-h-[400px] min-h-[400px] w-full bg-theme;
}
.pair {
  @apply flex flex-initial px-2;
}
.label {
  @apply flex-initial self-end px-2 font-medium;
}
.info {
  @apply flex-initial self-end px-2 text-lg;
}
@media only screen and (max-width: 820px) {
  .label {
    @apply text-sm;
  }
  .info {
    @apply text-base;
  }
}
</style>
