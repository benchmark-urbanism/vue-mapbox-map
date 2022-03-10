module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-html'),
    require('postcss-markdown'),
    require('tailwindcss/nesting'),
    require('tailwindcss')({
      config: './tailwind.config.cjs',
    }),
    require('autoprefixer'),
  ],
}
