<template lang="pug">
div
  div#map-container
    ClientOnly
      VueMapboxMap(
        v-if="mapInstance"
        :map="mapInstance"
        :lng="lng"
        :lat="lat"
        :zoom="zoom"
        :pitch="pitch"
        :bearing="bearing"
      )
  div
    p Zoom: {{ zoom.toLocaleString() }}
    p Pitch: {{ pitch.toLocaleString() }}
    p Bearing: {{ bearing.toLocaleString() }}
</template>

<style scoped lang="postcss">
#map-container {
  position: relative;
  margin: 20px 0 20px 0;
  width: 100%;
  height: 400px;
  background-color: lightgray;
}
</style>

<script>
// mapbox and related css files loaded in config.js head scripts
import VueMapboxMap from '../../../src/components/VueMapboxMap'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default {
  name: 'VueMapboxMapDemo',
  components: {
    VueMapboxMap
  },
  data() {
    return {
      computing: false,
      mapInstance: null,
      accessToken:
        'pk.eyJ1Ijoic2hvbmdvbG9sbyIsImEiOiJja2lubnc4ZWcxNTI2MzJxajhsa3NxcWtxIn0.gg7J040GTgBNook7aNclMQ',
      lng: -73.982,
      lat: 40.768,
      baseZoom: 13,
      basePitch: 20,
      baseBearing: 0,
      offset: 0
    }
  },
  computed: {
    zoom() {
      return this.baseZoom + this.offset * 5
    },
    pitch() {
      return this.basePitch + this.offset * 30
    },
    bearing() {
      return this.baseBearing + this.offset * 100
    }
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken
    this.mapInstance = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [this.lng, this.lat],
      zoom: this.zoom,
      bearing: this.bearing,
      pitch: this.pitch
    })
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      // https://developer.mozilla.org/en-US/docs/Web/Events/scroll#Example
      if (!this.computing) {
        // use RAF to throttle function
        // use arrow function for "this" context
        // NB - avoid calls that will reflow the page...!
        window.requestAnimationFrame(() => {
          // get offset
          let off = Math.round(window.document.documentElement.scrollTop || document.body.scrollTop)
          // normalise
          off = off / (2000 - window.innerHeight)
          if (off > 1) {
            off = 1
          }
          this.offset = off
          // reset
          this.computing = false
        })
        this.computing = true
      }
    }
  }
}
</script>
