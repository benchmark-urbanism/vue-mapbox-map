vue-mapbox-map
==============
This is a [Vue](https://vuejs.org/) component that wraps [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/). This lets you dynamically control the map from your Vue components.

Live example: [vue-mapbox-map](https://cityseer.github.io/vue-mapbox-map/). (Source: [docs/index.html](docs/index.html))

1. [Web Usage](#web-usage)
1. [Module Usage](#module-usage)
1. [API](#api)
1. [Requests](#requests)

Web Usage
---------
When using this module from the web, include the script file:
```html
<script src='https://unpkg.com/vue-mapbox-map/dist/vue-mapbox-map.umd.js'></script>
```
The mapbox GL and mapbox Geocoder links must also be included because the `vue-mapbox-map` script will look for `mapboxgl` and `MapboxGeocoder` in the window's global namespace, for example:
```html
<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.js' type="text/javascript"></script>
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.css' rel='stylesheet' type='text/css' />
<script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.min.js' type="text/javascript"></script>
<link href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.css' rel='stylesheet' type='text/css' />
```
The map will collapse unless you include style parameters for your map div, for example:
```html
<style>
  body { margin:0; padding:0; }
  #map { position:absolute; top:0; bottom:0; width:100%; }
</style>
```
Then include the component in your `body`, for example:
```html
<body>
<div id='app'>
    <vue-mapbox-map id='map'
                    :access-token='accessToken'
                    :interactive='false'
                    :geocoder='true'
                    :lng='lng'
                    :lat='lat'
                    :zoom='zoom'
                    :pitch='pitch'
                    :bearing='bearing'
    ></vue-mapbox-map>
    </div>
</body>
```
and compose your `vue` instance in the `script`, for example:
```javascript
const app = new Vue({
  // DOM target element
  el: '#app',
  data: {
    accessToken: '<insert-your-access-token>',
    lng: -73.984495,
    lat: 40.756027,
    zoom: 13,
    pitch: 20,
    bearing: 0
  },
  // Add vue-mapbox-map component
  components: {
    'vue-mapbox-map': VueMapboxMap
  }
})
```

Module Usage
------------
To use the module in your application, install via `yarn` or `npm`:
```
yarn add vue-mapbox-map
```
You also need `mapbox-gl` and `@mapbox/mapbox-gl-geocoder`:
```
yarn add mapbox-gl @mapbox/mapbox-gl-geocoder
```
`mapboxgl` and `MapboxGeocoder`'s CSS files are not bundled in the module, so include them directly in your CSS:
```css
@import url("https://api.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.css");
@import url("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.css");
```
and remember to add a CSS style for your map div so that it does not collapse:
```css
#map {
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 width: 100%;
}
```
It is then a matter of importing the module and registering it to your components:
```js
import VueMapboxMap from 'vue-mapbox-map'

...
components: {
  VueMapboxMap
}
```
You can then use it in your `html`:
```html
<vue-mapbox-map id='map'
    :accessToken='scene.accessToken'
    :mapStyle='scene.mapboxStyle'
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
from which you can make reference to your `vue` component's data context.

API
---
The component's props (effectively the API) are as follows:
```javascript
props: {
  // mapbox requires an access token
  accessToken: {
    type: String,
    required: true
  },
  // target map style, you can also load a local map style configuration
  mapStyle: {
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
}
```
A `@mapbox-ready` event is emitted when the map is instanced, and will return the map object. You can then use this for subsequent interaction with the map object, for example:
```javascript
methods: {
  setMap (map) {
      this.map = map
    }
}
```
A `@mapbox-destroyed` event is emitted when the map is destroyed.

Additional Functionality
------------------------
Please use the issues tracker to raise any requests for additional functionality.