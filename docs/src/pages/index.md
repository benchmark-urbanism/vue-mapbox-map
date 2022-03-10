---
layout: ../layouts/BaseLayout.astro
setup: |
  import RepoLink from '../components/RepoLink.vue'
  import Demo from '../components/Demo.vue'
---

<RepoLink
repoLink='https://github.com/benchmark-urbanism/vue-mapbox-map'
repoText='vue-mapbox-map'/>

# VueMapboxMap

A minimalist [Vue](https://vuejs.org/) component wrapping [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/) or [MapLibre GL](https://github.com/maplibre/maplibre-gl-js) for dynamic maps.

In the spirit of keeping things light and not reinventing the wheel: this component wraps only what is necessary for dynamic updates. Use the map instance directly otherwise.

> `v1.0.0^` has been refactored for Vue 3. Use the previous `v0.14.11` version for Vue 2 projects.

> See the complementary [vue-mapbox-feature](https://benchmark-urbanism.github.io/vue-mapbox-feature/) repo for dynamic geoJSON features.

## Demo

<Demo client:only='vue' />

## Setup

> See the documentation's [demo](https://github.com/benchmark-urbanism/vue-mapbox-map/blob/master/docs/.vuepress/components/Demo.vue) component for a complete example.

Install via `yarn` or `npm`:

```
yarn add @benchmark-urbanism/vue-mapbox-map
```

## General Usage

Import the `VueMapboxMap` component:

```js
import VueMapboxMap from '@benchmark-urbanism/vue-mapbox-map'
```

Once imported, the `VueMapboxMap` tag will be available for use:

```html
<VueMapboxMap
  :map="mapInstance"
  :lng="scene.lng"
  :lat="scene.lat"
  :zoom="scene.zoom"
  :pitch="scene.pitch"
  :bearing="scene.bearing"
></VueMapboxMap>
```

A `mapbox-gl` or `maplibre-gl` instance must be provided: these should be installed and instanced in accordance with standard procedures. Reactive data can be used to update the `lng`, `lat`, `zoom`, `pitch`, and `bearing` dynamically from the data context of the component:

```js
// use reactive data for updating the map
const scene = reactive({
  lng: -73.982,
  lat: 40.768,
  zoom: 13,
  pitch: 20,
  bearing: 0,
})
// setup mapbox
mapboxgl.accessToken = aToken
onMounted(() => {
  mapInstance = new mapboxgl.Map({
    container: 'map-container',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [scene.lng, scene.lat],
    zoom: scene.zoom,
    pitch: scene.pitch,
    interactive: false,
  })
})
```

## API

The component's props / API is as follows:

```js
// a mapbox or maplibre instance
map: {
  type: Object,
  default: () => {},
},
// whether to jump, ease, or fly for transitions
transitionMode: {
  type: String,
  required: false,
  default: 'jump',
  validator: function (value) {
    return ['jump', 'ease', 'fly'].indexOf(value) !== -1
  },
},
// longitude (dynamic)
lng: {
  type: [Number, String],
  required: true,
},
// latitude (dynamic)
lat: {
  type: [Number, String],
  required: true,
},
// zoom (dynamic)
zoom: {
  type: [Number, String],
  default: 13,
},
// pitch (dynamic)
pitch: {
  type: [Number, String],
  default: 60,
},
// bearing (dynamic)
bearing: {
  type: [Number, String],
  default: 0,
},
// around (dynamic)
around: {
  type: Array,
  default: null,
  validator: function (value) {
    return value.length === 2
  },
},
```
