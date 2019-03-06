(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('mapbox-gl'), require('@mapbox/mapbox-gl-geocoder')) :
  typeof define === 'function' && define.amd ? define(['mapbox-gl', '@mapbox/mapbox-gl-geocoder'], factory) :
  (global = global || self, global.VueMapboxMap = factory(global.mapboxgl, global.MapboxGeocoder));
}(this, function (mapboxgl, MapboxGeocoder) { 'use strict';

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
        required: false
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
      // whether to jump, ease, or fly for transitions
      transitionMode: {
        type: String,
        required: false,
        default: 'jump',
        validator: function (value) {
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
    mounted: function mounted () {
      var this$1 = this;

      if (this.accessToken) {
        mapboxgl.accessToken = this.accessToken;
      } else {
        console.warn('NOTE -> No access token has been provided. If using Mapbox hosted tiles then this omission may break your map.');
      }
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
    computed: {
      mapScene: function mapScene () {
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
      mapScene: function mapScene (val) {
        if (val) {
          if (!this.map) {
            console.error('NOTE -> Map object not set');
            return
          }
          if (val.pitch < 0 || val.pitch > 60 ) {
            console.error(("NOTE -> Unable to update pitch to " + (val.pitch) + ". Exceeds permitted range."));
            return
          }
          if (val.bearing < 0 || val.bearing > 360) {
            console.error(("NOTE -> Unable to update bearing to " + (val.bearing) + ". Exceeds permitted range."));
            return
          }
          if (this.transitionMode === 'jump') {
            this.map.jumpTo(val);
          } else if (this.transitionMode === 'ease') {
            this.map.easeTo(val);
          } else if (this.transitionMode === 'fly') {
            this.map.flyTo(val);
          }
        }
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

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
    /* style inject */
    
    /* style inject SSR */
    

    
    var VueMapboxMap = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      undefined,
      undefined
    );

  return VueMapboxMap;

}));
