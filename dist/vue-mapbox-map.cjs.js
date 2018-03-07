'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var mapboxgl = _interopDefault(require('mapbox-gl'));
var MapboxGeocoder = _interopDefault(require('@mapbox/mapbox-gl-geocoder'));

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css="@import url(\"https://api.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.css\"); @import url(\"https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.css\"); "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var VueMapboxMap = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"mapboxMapDiv"})},staticRenderFns: [],
  name: 'VueMapboxMap',
  data: function data () {
    return {
      map: null
    }
  },
  props: {
    accessToken: {
      type: String,
      required: true
    },
    mapStyle: {
      type: [String, Object],
      default: 'mapbox://styles/mapbox/light-v9'
    },
    // whether map can be interacted with by user
    interactive: {
      type: Boolean,
      default: true
    },
    geocoder: {
      type: Boolean,
      default: false
    },
    lng: {
      type: Number,
      required: true
    },
    lat: {
      type: Number,
      required: true
    },
    zoom: {
      type: Number,
      default: 13
    },
    pitch: {
      type: Number,
      default: 90
    },
    bearing: {
      type: Number,
      default: 0
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    mapboxgl.accessToken = this.accessToken;
    this.map = new mapboxgl.Map({
      container: this.$refs.mapboxMapDiv,
      style: this.mapStyle,
      interactive: this.interactive,
      center: [
        this.lng,
        this.lat
      ],
      zoom: this.zoom,
      bearing: this.bearing,
      pitch: this.pitch
    });
    if (this.geocoder) {
      this.map.addControl(new MapboxGeocoder({
        accessToken: this.accessToken,
        zoom: 18,
        flyTo: true,
        // bias results closer to london
        proximity: {
          longitude: this.lng,
          latitude: this.lat
        }
      }));
    }
    this.map.on('dragend', function () { this$1.$emit('dragend'); });
    this.map.on('zoomend', function () { this$1.$emit('zoomend'); });
    // return the map for reference from parent component
    this.$emit('mapboxReady', this.map);
  },
  destroyed: function destroyed () {
    this.$emit('mapboxDestroyed');
  },
  watch: {
    mapStyle: {
      deep: true,
      handler: function handler (val) {
        if (val && this.map) {
          // TODO: currently custom data layers are lost, but probably option to save them in future per
          // https://github.com/mapbox/mapbox-gl-js/issues/4006
          // currently this means that updating the style will undo any custom feature collections...
          this.map.setStyle(val);
        } else {
          console.error(("NOTE -> Unable to update map style to " + val + "."));
        }
      }
    },
    lng: function lng (val) {
      if (val && this.map && this.lat) {
        this.map.jumpTo({ center: [this.lng, this.lat ] });
      } else {
        console.error(("NOTE -> Unable to update centre to " + (this.lng) + ", " + (this.lat) + "."));
      }
    },
    lat: function lat (val) {
      if (val && this.map && this.lng) {
        this.map.jumpTo({center: [this.lng, this.lat]});
      } else {
        console.error(("NOTE -> Unable to update centre to " + (this.lng) + ", " + (this.lat) + "."));
      }
    },
    zoom: function zoom (val) {
      if (val && this.map) {
        this.map.setZoom(val);
      } else {
        console.error(("NOTE -> Unable to update zoom to " + val + "."));
      }
    },
    pitch: function pitch (val) {
      if (val && this.map) {
        this.map.setPitch(val);
      } else {
        console.error(("NOTE -> Unable to update pitch to " + val + "."));
      }
    },
    bearing: function bearing (val) {
      if (val && this.map) {
        this.map.setBearing(val);
      } else {
        console.error(("NOTE -> Unable to update bearing to " + val + "."));
      }
    }
  }
}

module.exports = VueMapboxMap;
