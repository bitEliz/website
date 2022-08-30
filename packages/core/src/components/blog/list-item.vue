<template>
  <NuxtLink class="tile d-flex flex--column" :class="linkClass" :to="link">
    <div
      v-if="props.blog?.artworkUrl"
      class="tile__media"
      :style="mediaTagStyleProp"
    >
      <img :src="props.blog.artworkUrl" />
    </div>

    <div
      class="tile__description d--flex flex--column justify--space-between"
      aria-hidden="true"
    >
      <div class="tile__head">
        <div class="tile__category txt-t--uppercase">{{ props.blog.tags }}</div>
        <div class="tile__headline">
          {{ props.blog.title }}
        </div>
      </div>

      <time class="tile__timestamp txt-t--uppercase" :datatime="blog.createdAt">
        {{ props.blog.createdAt }}
      </time>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Blog } from '~/types/fluent'

const props = defineProps<{
  aspectRatio?: string
  vertical?: boolean
  blog: Blog
}>()
const link = '/blog/' + props.blog.alias
const linkClass = !props.vertical ? 'sm:flex--row' : ''
const mediaTagStyleProp = props.aspectRatio ? props.aspectRatio : ''
</script>

<style lang="scss" scoped>
.tile {
  width: 100%;
  background: white;
  border-radius: 0.5rem;

  .tile__media {
    position: relative;
    width: 100%;
    padding-top: percentage(1.7778);

    & > :first-child {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  .tile__description {
    padding: 2rem;
    flex-grow: 1;
  }
}
</style>
