<template>
  <div class="grid" style="--bs-gap: 1rem" v-for="g in galleries">
    <div class="g-col-12 g-col-md-6 g-col-lg-4" v-for="e in g">
      <a v-if="e.trackViewUrl" class="text-decoration-none" :href="e.trackViewUrl" target="_blank">
        <ProjectGalleryItem :="e" />
      </a>
      <ProjectGalleryItem v-else :="e" />
    </div>
  </div>
</template>

<script setup lang="ts">
import fluent from "~/types/fluent"

const props = defineProps<{ galleries: Array<Array<fluent.Project>> }>()
const galleries = props.galleries
</script>

<style lang="scss" scoped>
.grid {
  &:not(:last-child) {
    padding-bottom: var(--#{$prefix}gap);
  }

  a {
    color: var(--#{$prefix}body-color);

    &:focus,
    &:hover {
      color: var(--#{$prefix}body-color);
    }
  }
}
</style>