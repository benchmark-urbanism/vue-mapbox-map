<template lang="pug">
div
  #repo-container
    a#repo-link(:href='repoLink' :title='title' target='_blank')
      Github#repo-logo
      #repo-text {{ repoText }}
</template>

<script setup>
import { Github } from '@vicons/fa'
import { computed } from 'vue'

const props = defineProps({
  repoLink: {
    required: true,
    type: String,
  },
  repoText: {
    required: false,
    type: String,
    default: null,
  },
})
const title = computed(() =>
  props.repoText ? props.repoText : `Link to Github repo for ${props.repoLink}`
)
</script>

<style lang="postcss" scoped>
#repo-container {
  @apply my-4 flex items-center justify-center;
}
#repo-link {
  @apply text-theme relative flex flex-col items-center justify-center;
}
#repo-logo {
  @apply h-20 w-20 transition-all;
}
#repo-link:hover > #repo-logo {
  transform: scale(1.1);
}
#repo-text {
  @apply pt-1 text-lg font-semibold;
}
</style>
