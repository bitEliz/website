<template>
  <header
    class="header blog__summary"
    :class="blog.artworkUrl ? 'd--flex flex--column sm:flex--row' : ''"
  >
    <div v-if="blog.artworkUrl" class="blog__media" style="padding-bottom: 25%">
      <img :src="blog.artworkUrl" />
    </div>

    <div class="blog__description">
      <div class="blog__head">
        <h1 class="blog__headline">{{ blog.title }}</h1>
        <div
          class="blog__category txt-t--uppercase"
          style="margin-bottom: 1rem"
        >
          <div class="tag__list">
            <span
              v-for="tag in blog.tags"
              :key="tag"
              class="tag"
              style="margin-right: 0.5rem"
              >{{ tag }}</span
            >
          </div>
          <time pubdate :datetime="blog.createdAt">{{ blog.createdAt }}</time>
        </div>
      </div>
      <Markdown
        v-if="blog.excerpt"
        class="blog__excerpt"
        :src="blog.excerpt"
      ></Markdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import fluent from '~/types/fluent'

const props = defineProps<{ blog: fluent.Blog }>()
const blog = props.blog
</script>
