vue-mapbox-map
==============

A minimalist [Vue](https://vuejs.org/) component wrapping [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/) for dynamic maps.

::: tip Hint
See the complementary [vue-mapbox-feature](https://github.com/cityseer/vue-mapbox-feature) repo for dynamic geoJSON features.
:::

Demo
----

<Demo/>
http://localhost:8081/vue-mapbox-map/test.html
http://localhost:8081/vue-mapbox-map/test.html

Web Usage
---------

For direct usage from a webpage, import the Mapbox GL JS and Mapbox Geocoder scripts and stylesheets, then import the `vue-mapbox-map` script. This will add `VueMapboxMap` to the global namespace, which in-turn depends on `mapboxgl` and `MapboxGeocoder`:
```html
<!-- mapbox -->
<link rel='stylesheet' type='text/css' href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css'/>
<link rel='stylesheet' type='text/css' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v3.1.4/mapbox-gl-geocoder.css'/>
<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.js'></script>
<script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v3.1.4/mapbox-gl-geocoder.min.js'></script>
<!-- vue-mapbox-map -->
<script src='https://unpkg.com/vue-mapbox-map@latest/dist/vue-mapbox-map.umd.js'></script>
```

The map will collapse unless style parameters have been specified for the map `div`:
```html
<style>
  #map { position:absolute; top:0; bottom:0; width:100%; }
</style>
```

Web usage [example](test.html) and [source](https://github.com/cityseer/vue-mapbox-map/docs/.vuepress/public/test.html).


Module Usage
------------

Install via `yarn` or `npm`:
```
yarn add vue-mapbox-map
```

`vue-mapbox-map` will trigger installation of the `mapboxgl` and `MapboxGeocoder` dependencies, but their CSS files are not bundled inside the modules, so include these directly in the CSS:
```css
@import url("https://api.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css");
@import url("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v3.1.4/mapbox-gl-geocoder.css");
```

Add a CSS style for the map div so that it does not collapse:
```css
#map {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
```

Import the component into the app and register the component:
```javascript
import VueMapboxMap from 'vue-mapbox-map'

export default {
  name: 'VueMapboxMap-Demo',
  components: {
    'vue-mapbox-map': VueMapboxMap
  },
  ...
}
```

General Usage
-------------

Once imported and registered as a component, the new `vue-mapbox-map` tag will be available for use from `html`:
```html
<vue-mapbox-map id='map'
:access-token='scene.accessToken'
:interactive='false'
:geocoder='false'
:lng='scene.lng'
:lat='scene.lat'
:zoom='scene.zoom'
:pitch='scene.pitch'
:bearing='scene.bearing'
@mapbox-ready='setMap'
@mapbox-destroyed='unsetMap'
></vue-mapbox-map>
```

The props are reactive and can be controlled from the data context of the component:
```javascript
// provide the corresponding data context
data: {
  scene: {
    accessToken: '<your-access-token>',
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
```javascript
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
}
```

A `@mapbox-ready` event is emitted when the map is instanced, and will return the map object. You can then use this for subsequent interaction with the map object, such as adding controls or events:
```javascript
methods: {
  setMap (map) {
    // the map object can be manipulated as normal, e.g. for adding events and controls
    this.map = map
  }
}
```

A `@mapbox-destroyed` event is similarly emitted when the map is destroyed.

Other event listeners should be added to the returned map object directly.

Additional Functionality
------------------------
Please use the issues tracker to request exposing any additional functionality.