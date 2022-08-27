<template>
  <div class="tile w-100">
    <div class="tile-media mb-4">
      <BIGithub v-if="project.isOpenSource && !project.artworkUrl" />
      <img :src="project.artworkUrl" alt="" v-else />
    </div>
    <div class="tile-description">
      <Markup class="tile-excerpt" :src="project.summary" />
    </div>
  </div>
</template>

<script setup lang="ts">
const project = defineProps<{ isOpenSource: boolean; summary: string; artworkUrl?: string }>()
</script>

<style lang="scss" scoped>
.tile {
  background: var(--#{$prefix}body-bg);
  @include border-radius(0.5rem);

  padding: 2rem;
  padding-bottom: 1rem;

  i.bi,
  img,
  svg {
    width: 5rem;
    height: 5rem;
    @include border-radius(1rem);
  }
}
</style>
