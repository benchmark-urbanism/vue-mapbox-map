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
      return {
        center: [this.lng, this.lat],
        zoom: this.zoom,
        bearing: this.bearing,
        pitch: this.pitch
      }
    }
  },
  watch: {
    mapStyle: {
      deep: true,
      handler(val) {
        if (val && this.map) {
          // TODO: currently custom data layers are lost, but probably option to save them in future per
          // https://github.com/mapbox/mapbox-gl-js/issues/4006
          // currently this means that updating the style will undo any custom feature collections...
          this.map.setStyle(val)
        } else {
          console.error(`NOTE -> Unable to update map style to ${val}.`)
        }
      }
    },
    mapScene(val) {
      if (val) {
        if (!this.map) {
          console.error('NOTE -> Map object not set')
          return
        }
        if (val.pitch < 0 || val.pitch > 60) {
          console.error(`NOTE -> Unable to update pitch to ${val.pitch}. Exceeds permitted range.`)
          return
        }
        if (val.bearing < 0 || val.bearing > 360) {
          console.error(
            `NOTE -> Unable to update bearing to ${val.bearing}. Exceeds permitted range.`
          )
          return
        }
        if (this.transitionMode === 'jump') {
          this.map.jumpTo(val)
        } else if (this.transitionMode === 'ease') {
          this.map.easeTo(val)
        } else if (this.transitionMode === 'fly') {
          this.map.flyTo(val)
        }
      }
    }
  },
  render() {
    return this.$slots.default
  }
}
</script>
