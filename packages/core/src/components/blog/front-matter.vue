<template>
  <header
    class="front-matter"
    :class="artworkUrl ? 'd-flex flex-column flex-sm-row' : ''"
  >
    <div
      v-if="artworkUrl"
      class="front-matter-images"
      style="padding-bottom: 25%"
    >
      <img :src="artworkUrl" />
    </div>

    <div class="front-matter-description">
      <div class="blog__head">
        <h1 class="blog__headline">{{ title }}</h1>
        <div class="blog__category txt-uppercase" style="margin-bottom: 1rem">
          <div class="front-matter-tags">
            <span
              v-for="tag in tags"
              :key="tag"
              class="tag"
              style="margin-right: 0.5rem"
              >{{ tag }}</span
            >
          </div>
          <time pubdate :datetime="createdAt">{{ createdAt }}</time>
        </div>
      </div>
      <Markdown
        v-if="excerpt"
        class="front-matter-excerpt"
        :src="excerpt"
      ></Markdown>
    </div>
  </header>
</template>

<script setup lang="ts">
const { title, artworkUrl, excerpt, tags, createdAt } = defineProps<{
  title: string
  artworkUrl?: string
  excerpt?: string
  tags?: Array<string>
  createdAt: string
}>()
</script>
