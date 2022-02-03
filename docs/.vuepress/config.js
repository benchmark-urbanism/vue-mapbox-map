const { path } = require('@vuepress/utils')

module.exports = {
  base: '/vue-mapbox-map/', // must match github pages publish URL
  title: 'vue-mapbox-map',
  description: 'A Vue component for dynamic Mapbox GL JS maps!',
  bundler: '@vuepress/bundler-vite',
  markdown: {
    anchor: true,
  },
  theme: '@vuepress/default',
  themeConfig: {
    home: '/',
    navbar: [],
    darkMode: true,
    repo: 'https://github.com/benchmark-urbanism/vue-mapbox-map',
    repoLabel: 'github',
    sidebar: 'auto',
    sidebarDepth: 1,
    docsDir: 'docs',
    docsBranch: 'gh-pages',
    themePlugins: {
      activeHeaderLinks: true,
      backToTop: true,
    },
  },
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components/'),
      },
    ],
  ],
}
