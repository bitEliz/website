<template>
  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path
      v-for="(path, index) in paths"
      :key="index"
      :fill="path.fill !== null ? path.fill : currentColor"
      :d="path.path"
    />
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    paths: Array,
  },
};
</script>
