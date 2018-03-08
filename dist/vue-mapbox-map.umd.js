(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('mapbox-gl'), require('@mapbox/mapbox-gl-geocoder')) :
	typeof define === 'function' && define.amd ? define(['mapbox-gl', '@mapbox/mapbox-gl-geocoder'], factory) :
	(global.VueMapboxMap = factory(global.mapboxgl,global.MapboxGeocoder));
}(this, (function (mapboxgl,MapboxGeocoder) { 'use strict';

mapboxgl = mapboxgl && mapboxgl.hasOwnProperty('default') ? mapboxgl['default'] : mapboxgl;
MapboxGeocoder = MapboxGeocoder && MapboxGeocoder.hasOwnProperty('default') ? MapboxGeocoder['default'] : MapboxGeocoder;

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var VueMapboxMap = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"mapboxMapDiv"})},staticRenderFns: [],
  name: 'VueMapboxMap',
  data: function data () {
    return {
      map: null
    }
  },
  props: {
    // mapbox requires an access token
    'access-token': {
      type: String,
      required: true
    },
    // target map style, you can also load a local map style configuration
    'map-style': {
      type: [String, Object],
      default: 'mapbox://styles/mapbox/light-v9'
    },
    // whether map can be interacted with
    interactive: {
      type: Boolean,
      default: true
    },
    // whether to instance the geocoder
    geocoder: {
      type: Boolean,
      default: false
    },
    // longitude (dynamic)
    lng: {
      type: Number,
      required: true
    },
    // latitude (dynamic)
    lat: {
      type: Number,
      required: true
    },
    // zoom (dynamic)
    zoom: {
      type: Number,
      default: 13
    },
    // pitch (dynamic)
    pitch: {
      type: Number,
      default: 60
    },
    // bearing (dynamic)
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
    // return the map for reference from parent component
    this.map.on('load', function () { this$1.$emit('mapbox-ready', this$1.map); });
    this.map.on('dragend', function () { this$1.$emit('dragend'); });
    this.map.on('zoomend', function () { this$1.$emit('zoomend'); });
    this.map.on('remove', function () { this$1.$emit('mapbox-destroyed'); });
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
      if (val >= 0 && val <= 60 && this.map) {
        this.map.setPitch(val);
      } else {
        console.error(("NOTE -> Unable to update pitch to " + val + ". Exceeds permitted range."));
      }
    },
    bearing: function bearing (val) {
      if (val >= 0 && val <= 360 && this.map) {
        this.map.setBearing(val);
      } else {
        console.error(("NOTE -> Unable to update bearing to " + val + ". Exceeds permitted range."));
      }
    }
  }
}

return VueMapboxMap;

})));
