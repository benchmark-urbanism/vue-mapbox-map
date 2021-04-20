<script>
export default {
  name: 'VueMapboxMap',
  props: {
    // a mapbox or maplibre instance
    map: {
      type: Object,
      required: true
    },
    // whether to jump, ease, or fly for transitions
    transitionMode: {
      type: String,
      required: false,
      default: 'jump',
      validator: function(value) {
        return ['jump', 'ease', 'fly'].indexOf(value) !== -1
      }
    },
    // longitude (dynamic)
    lng: {
      type: [Number, String],
      required: true
    },
    // latitude (dynamic)
    lat: {
      type: [Number, String],
      required: true
    },
    // zoom (dynamic)
    zoom: {
      type: [Number, String],
      default: 13
    },
    // pitch (dynamic)
    pitch: {
      type: [Number, String],
      default: 60
    },
    // bearing (dynamic)
    bearing: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    mapScene() {
      if (this.pitch < 0 || this.pitch > 60) {
        console.error(`NOTE -> Unable to update pitch to ${this.pitch}. Exceeds permitted range.`)
        return null
      }
      if (this.bearing < 0 || this.bearing > 360) {
        console.error(
          `NOTE -> Unable to update bearing to ${this.bearing}. Exceeds permitted range.`
        )
        return null
      }
      return {
        center: [this.lng, this.lat],
        zoom: this.zoom,
        bearing: this.bearing,
        pitch: this.pitch
      }
    }
  },
  watch: {
    mapScene() {
      this.updateMapState()
    }
  },
  mounted() {
    // style loaded seems to give more consistent results than checking for loaded
    if (this.map.isStyleLoaded()) {
      this.updateMapState()
    } else {
      this.map.on('style.load', () => {
        this.updateMapState()
      })
    }
  },
  methods: {
    updateMapState() {
      if (!this.mapScene) return
      if (this.transitionMode === 'jump') {
        this.map.jumpTo(this.mapScene)
      } else if (this.transitionMode === 'ease') {
        this.map.easeTo(this.mapScene)
      } else if (this.transitionMode === 'fly') {
        this.map.flyTo(this.mapScene)
      }
    }
  },
  render() {
    return this.$slots.default
  }
}
</script>
