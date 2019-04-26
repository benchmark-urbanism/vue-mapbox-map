module.exports = {
  base: '/vue-mapbox-map/',  // must match github pages publish URL
  title: 'vue-mapbox-map',
  description: 'A Vue component for dynamic Mapbox GL JS maps!',
  // need to load these for mapbox maps
  head: [
    ['link', {
      rel: 'stylesheet',
      type: 'text/css',
      href: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.54.0/mapbox-gl.css'
    }],
    ['script', {
      src: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.54.0/mapbox-gl.js'
    }]
  ],
  markdown: {
    anchor: true,
  },
  themeConfig: {
    lastUpdated: true,
    nav: [],
    displayAllHeaders: false,
    activeHeaderLinks: true,
    sidebarDepth: 1,
    sidebar: 'auto',
    repo: 'cityseer/vue-mapbox-map',
    repoLabel: 'github',
    docsRepo: 'cityseer/vue-mapbox-map',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'gh-pages',
    serviceWorker: {
      updatePopup: true
    }
  },
  evergreen: true
}
