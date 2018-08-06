(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('mapbox-gl'), require('@mapbox/mapbox-gl-geocoder')) :
  typeof define === 'function' && define.amd ? define(['mapbox-gl', '@mapbox/mapbox-gl-geocoder'], factory) :
  (global.VueMapboxMap = factory(global.mapboxgl,global.MapboxGeocoder));
}(this, (function (mapboxgl,MapboxGeocoder) { 'use strict';

  mapboxgl = mapboxgl && mapboxgl.hasOwnProperty('default') ? mapboxgl['default'] : mapboxgl;
  MapboxGeocoder = MapboxGeocoder && MapboxGeocoder.hasOwnProperty('default') ? MapboxGeocoder['default'] : MapboxGeocoder;

  //

  var script = {
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
      // whether to display the attribution control
      // this is required by mapbox unless you fulfill this requirement elsehow
      'attribution-control': {
        type: Boolean,
        default: true
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
        pitch: this.pitch,
        attributionControl: this.attributionControl
      });
      if (this.geocoder) {
        this.map.addControl(new MapboxGeocoder({
          accessToken: this.accessToken,
          zoom: 18,
          flyTo: true,
          // bias results closer to starting point
          proximity: {
            longitude: this.lng,
            latitude: this.lat
          }
        }));
      }
      // return the map for reference from parent component
      this.map.on('load', function () { this$1.$emit('mapbox-ready', this$1.map); });
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
  };

  /* script */
              var __vue_script__ = script;
              
  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { ref: "mapboxMapDiv" })
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = undefined;
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* component normalizer */
    function __vue_normalize__(
      template, style, script$$1,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "/Users/gareth/dev/github/vue-mapbox-map/src/VueMapboxMap.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) { component.functional = true; }
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    function __vue_create_injector__() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
      var isOldIE =
        typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

      return function addStyle(id, css) {
        if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

        if (!style.ids.includes(id)) {
          var code = css.source;
          var index = style.ids.length;

          style.ids.push(id);

          if (isOldIE) {
            style.element = style.element || document.querySelector('style[data-group=' + group + ']');
          }

          if (!style.element) {
            var el = style.element = document.createElement('style');
            el.type = 'text/css';

            if (css.media) { el.setAttribute('media', css.media); }
            if (isOldIE) {
              el.setAttribute('data-group', group);
              el.setAttribute('data-next-index', '0');
            }

            head.appendChild(el);
          }

          if (isOldIE) {
            index = parseInt(style.element.getAttribute('data-next-index'));
            style.element.setAttribute('data-next-index', index + 1);
          }

          if (style.element.styleSheet) {
            style.parts.push(code);
            style.element.styleSheet.cssText = style.parts
              .filter(Boolean)
              .join('\n');
          } else {
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index]) { style.element.removeChild(nodes[index]); }
            if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
            else { style.element.appendChild(textNode); }
          }
        }
      }
    }
    /* style inject SSR */
    

    
    var VueMapboxMap = __vue_normalize__(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      __vue_create_injector__,
      undefined
    );

  return VueMapboxMap;

})));
