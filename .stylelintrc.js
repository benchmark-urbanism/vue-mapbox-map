module.exports = {
  extends: [
    'stylelint-config-recommended-vue',
    'stylelint-config-standard',
    'stylelint-config-prettier',
  ],
  rules: {
    'selector-nested-pattern': '^&',
  },
}
