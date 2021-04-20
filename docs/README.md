# VueMapboxMap

A minimalist [Vue](https://vuejs.org/) component wrapping [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/) or [MapLibre GL](https://github.com/maplibre/maplibre-gl-js) for dynamic maps.

In the spirit of keeping things light and not reinventing the wheel: this component wraps only what is necessary for dynamic updates.

::: tip
See the complementary [vue-mapbox-feature](https://benchmark-urbanism.github.io/vue-mapbox-feature/) repo for dynamic geoJSON features.
:::

## Demo

<ClientOnly>
<Demo/>
</ClientOnly>

## Setup for web usage

For direct usage from a webpage, import the Mapbox GL JS script and stylesheet, then import the `VueMapboxMap` script: this will make the `VueMapboxMap` component available in the browser:

```html
<!-- mapbox -->
<script src="https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.js"></script>
<link href="https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css" rel="stylesheet" />
<!-- VueMapboxMap -->
<script src="https://unpkg.com/@benchmark-urbanism/vue-mapbox-map@latest/dist/VueMapboxMap.min.js"></script>
```

Web usage [example](https://benchmark-urbanism.github.io/vue-mapbox-map/test.html) and [source](https://github.com/benchmark-urbanism/vue-mapbox-map/blob/master/docs/.vuepress/public/test.html).

## Setup for module usage

> See the documentation's [demo](https://github.com/benchmark-urbanism/vue-mapbox-map/blob/master/docs/.vuepress/components/Demo.vue) component for a complete example.

Install via `yarn` or `npm`:

```
yarn add @benchmark-urbanism/vue-mapbox-map
```

## General Usage

Import the `vue-mapbox-map` component:

```js
import VueMapboxMap from '@benchmark-urbanism/vue-mapbox-map'
```

Register the component:

```js
components: {
  VueMapboxMap
}
```

Once registered, the `vue-mapbox-map` tag will be available for use. Use a `v-if` directive to stall the component until the provided `mapbox-gl` or `maplibre-gl` instances are ready to roll.

```html
<VueMapboxMap
  v-if="mapInstance"
  :map="mapInstance"
  :lng="scene.lng"
  :lat="scene.lat"
  :zoom="scene.zoom"
  :pitch="scene.pitch"
  :bearing="scene.bearing"
></VueMapboxMap>
```

A `mapbox-gl` or `maplibre-gl` instance must be provided to `vue-mapbox-map`: these should be installed and instanced in accordance with standard procedures. For example:

```js
mapboxgl.accessToken = this.accessToken
this.mapInstance = new mapboxgl.Map({
  container: 'map-container',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [this.lng, this.lat],
  zoom: this.zoom,
  bearing: this.bearing,
  pitch: this.pitch
})
```

The `lng`, `lat`, `zoom`, `pitch`, and `bearing` props can then be updated dynamically from the data context of the component, for example:

```js
// provide the corresponding data context
data () {
  return {
    mapInstance: null,
    scene: {
      lng: -73.982,
      lat: 40.768,
      baseZoom: 13,
      basePitch: 20,
      baseBearing: 0
    }
  }
}
```

## API

The component's props / API is as follows:

```js
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
