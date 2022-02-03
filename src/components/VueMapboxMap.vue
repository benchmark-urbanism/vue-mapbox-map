<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup>
import { markRaw, toRefs, watchEffect } from 'vue'

// props
const props = defineProps({
  // a mapbox or maplibre instance
  map: {
    type: Object,
    default: () => {},
  },
  // whether to jump, ease, or fly for transitions
  transitionMode: {
    type: String,
    required: false,
    default: 'jump',
    validator: function (value) {
      return ['jump', 'ease', 'fly'].indexOf(value) !== -1
    },
  },
  // longitude (dynamic)
  lng: {
    type: [Number, String],
    required: true,
  },
  // latitude (dynamic)
  lat: {
    type: [Number, String],
    required: true,
  },
  // zoom (dynamic)
  zoom: {
    type: [Number, String],
    default: 13,
  },
  // pitch (dynamic)
  pitch: {
    type: [Number, String],
    default: 60,
  },
  // bearing (dynamic)
  bearing: {
    type: [Number, String],
    default: 0,
  },
  // around (dynamic)
  around: {
    type: Array,
    default: null,
    validator: function (value) {
      return value.length === 2
    },
  },
})
const { map, transitionMode, lng, lat, zoom, pitch, bearing } = toRefs(props)
const mapInstance = markRaw(map.value)
watchEffect(() => {
  if (!mapInstance) return
  if (pitch < 0 || pitch > 60) {
    console.error(`NOTE -> Unable to update pitch to ${pitch}. Exceeds permitted range.`)
    return null
  }
  if (bearing < 0 || bearing > 360) {
    console.error(`NOTE -> Unable to update bearing to ${bearing}. Exceeds permitted range.`)
    return null
  }
  const scene = {
    center: [lng, lat],
    zoom: zoom,
    bearing: bearing,
    pitch: pitch,
    around: around,
  }
  if (!scene) return
  if (transitionMode === 'jump') {
    mapInstance.jumpTo(scene)
  } else if (transitionMode === 'ease') {
    mapInstance.easeTo(scene)
  } else if (transitionMode === 'fly') {
    mapInstance.flyTo(scene)
  }
})
</script>
