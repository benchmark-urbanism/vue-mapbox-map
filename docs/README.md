VueMapboxMap
==============

A minimalist [Vue](https://vuejs.org/) component wrapping [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/) for dynamic maps.

This component wraps only what is necessary for dynamic updates and returns the map object. It leaves further configuration to conventional mapbox-gl paradigms on the principle that it is unnecessary (and needlessly convoluted) to wrap every last aspect of the mapbox-gl API into a vue component.

::: tip
See the complementary [vue-mapbox-feature](https://cityseer.github.io/vue-mapbox-feature/) repo for dynamic geoJSON features.
:::

Demo
----

<Demo/>

Setup for web usage
-------------------

For direct usage from a webpage, import the Mapbox GL JS script and stylesheet, then import the `VueMapboxMap` script: this will make the `VueMapboxMap` component available in the browser:
```html
<!-- mapbox -->
<link rel='stylesheet' type='text/css' href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.5.0/mapbox-gl.css'/>
<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v1.5.0/mapbox-gl.js'></script>
<!-- VueMapboxMap -->
<script src='https://unpkg.com/vue-mapbox-map@latest/dist/VueMapboxMap.umd.js'></script>
```

Web usage [example](https://cityseer.github.io/vue-mapbox-map/test.html) and [source](https://github.com/cityseer/vue-mapbox-map/blob/master/docs/.vuepress/public/test.html).


Setup for module usage
----------------------

Install via `yarn` or `npm`:
```
yarn add vue-mapbox-map
```

`vue-mapbox-map` will trigger installation of the `mapboxgl` dependency, but the Mapbox CSS file is not bundled, so include it directly:
```css
@import url("https://api.mapbox.com/mapbox-gl-js/v1.5.0/mapbox-gl.css");
```

Import the component:
```js
import VueMapboxMap from 'vue-mapbox-map'
```

General Usage
-------------

Add a CSS style for the intended map div so that it does not collapse:
```css
#map-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
```

Register the component:
```js
components: {
  'vue-mapbox-map': VueMapboxMap
}
```

Once registered, the `vue-mapbox-map` tag will be available for use:
```html
<vue-mapbox-map id='map-container'
  :access-token='scene.accessToken'
  :interactive='false'
  :lng='scene.lng'
  :lat='scene.lat'
  :zoom='scene.zoom'
  :pitch='scene.pitch'
  :bearing='scene.bearing'
  @mapbox-ready='setMap'
  @mapbox-destroyed='unsetMap'
></vue-mapbox-map>
```

The map can be controlled from the dynamic data context of the component:
```js
// provide the corresponding data context
data: {
  scene: {
    accessToken: '<your-accessToken>',
     lng: -73.984495,
     lat: 40.756027,
     zoom: 13,
     pitch: 20,
     bearing: 0
  }
}
```

API
---
The component's props / API is as follows:
```js
props: {
  // mapbox requires an access token
  // access as "access-token"
  accessToken: {
    type: String,
    required: false,
    default: ''
  },
  // target map style, you can also load a local map style configuration
  // access as "map-style"
  mapStyle: {
    type: [String, Object],
    default: 'mapbox://styles/mapbox/light-v9'
  },
  // whether to display the attribution control
  // this is required by mapbox unless you fulfill this requirement elsehow
  // access as "attribution-control"
  attributionControl: {
    type: Boolean,
    default: true
  },
  // whether map can be interacted with
  interactive: {
    type: Boolean,
    default: true
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
```

A `@mapbox-ready` event is emitted when the map is instanced, and will return the map object. You can then use this for subsequent interaction with the map object, such as adding controls or events:
```js
methods: {
  setMap (map) {
    // the map object can be manipulated as directly
    // e.g. for adding events and controls
    this.map = map
  }
}
```

::: tip Hint

Other event listeners and map controls should be added to the returned map object directly.

:::

A `@mapbox-destroyed` event is similarly emitted when the map is destroyed.
