<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
import { computed, toRefs, watchEffect } from 'vue'

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
const center = computed(() => {
  return { lng: props.lng, lat: props.lat }
})
const zoom = computed(() => props.zoom)
const bearing = computed(() => {
  if (props.bearing < 0) return 0
  if (props.bearing > 360) return 360
  return props.bearing
})
const pitch = computed(() => {
  if (props.pitch < 0) return 0
  if (props.pitch > 85) return 85
  return props.pitch
})
const { map } = toRefs(props)
watchEffect(() => {
  if (!map.value) return
  const scene = {
    center: center.value,
    zoom: zoom.value,
    bearing: bearing.value,
    pitch: pitch.value,
    around: props.around,
  }
  if (props.transitionMode === 'jump') {
    map.value.jumpTo(scene)
  } else if (props.transitionMode === 'ease') {
    map.value.easeTo(scene)
  } else if (props.transitionMode === 'fly') {
    map.value.flyTo(scene)
  }
})
</script>
