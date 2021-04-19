module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:vue/recommended'],
  plugins: ['prettier', 'vue'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
