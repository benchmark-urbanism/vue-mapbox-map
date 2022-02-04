<template>
  <div>
    <slot></slot>
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
const { pitch, bearing, lng, lat, zoom, around, transitionMode } = toRefs(props)
const refinePitch = computed(() => {
  if (pitch.value < 0) return 0
  if (pitch.value > 85) return 85
  return pitch.value
})
const refineBearing = computed(() => {
  if (bearing.value < 0) return 0
  if (bearing.value > 360) return 360
  return bearing.value
})
watchEffect(() => {
  if (!props.map) return
  const scene = {
    center: [lng.value, lat.value],
    zoom: zoom.value,
    bearing: refineBearing.value,
    pitch: refinePitch.value,
    around: around.value,
  }
  if (transitionMode.value === 'jump') {
    props.map.jumpTo(scene)
  } else if (transitionMode.value === 'ease') {
    props.map.easeTo(scene)
  } else if (transitionMode.value === 'fly') {
    props.map.flyTo(scene)
  }
})
</script>
