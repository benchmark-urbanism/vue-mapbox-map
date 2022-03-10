<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
import { computed, markRaw, ref, toRefs, watchEffect } from 'vue'
import { useThrottleFn } from '@vueuse/core'

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
/*
const emit = defineEmits([
  'update:lng',
  'update:lat',
  'update:zoom',
  'update:pitch',
  'update:bearing',
])
*/
const center = computed({
  get() {
    return [props.lng, props.lat]
  },
  set(value) {
    // emit('update:lng', value.lng)
    // emit('update:lat', value.lat)
  },
})
const zoom = computed({
  get() {
    return props.zoom
  },
  set(value) {
    // emit('update:zoom', value)
  },
})
const bearing = computed({
  get() {
    if (props.bearing < 0) return 0
    if (props.bearing > 360) return 360
    return props.bearing
  },
  set(value) {
    // emit('update:bearing', value)
  },
})
const pitch = computed({
  get() {
    if (props.pitch < 0) return 0
    if (props.pitch > 85) return 85
    return props.pitch
  },
  set(value) {
    // emit('update:pitch', value)
  },
})
const { map } = toRefs(props)
const mapStatic = computed(() => (map.value ? markRaw(map.value) : null))
/*
const updating = ref(false)
watchEffect(() => {
  if (!mapStatic.value) return
  if (!updating.value) {
    updating.value = true
    mapStatic.value.on(
      'move',
      useThrottleFn(() => {
        console.log('move')
        const c = mapStatic.value.getCenter()
        if (c.lat != center.value.lat || c.lng != center.value.lng) center.value = c
        const z = mapStatic.value.getZoom()
        if (z != zoom.value) zoom.value = z
        const b = mapStatic.value.getBearing()
        if (b != bearing.value) bearing.value = b
        const p = mapStatic.value.getPitch()
        if (p != pitch.value) pitch.value = p
      }, 100)
    )
  }
})
*/
watchEffect(() => {
  if (!mapStatic.value) return
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
