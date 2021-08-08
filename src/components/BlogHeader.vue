<template>
  <header
    class="header blog__summary"
    :class="artworkUrl ? 'd--flex flex--column sm:flex--row' : ''"
  >
    <div v-if="artworkUrl" class="blog__media" style="padding-bottom: 25%">
      <img :src="artworkUrl" />
    </div>

    <div class="blog__description">
      <div class="blog__head">
        <h1 class="blog__headline">{{ title }}</h1>
        <div class="blog__category txt-t--uppercase" style="margin-bottom: 1rem">
          <div class="tag__list">
            <span v-for="tag in tags" :key="tag" class="tag" style="margin-right: 0.5rem">{{
              tag
            }}</span>
          </div>
          <time pubdate :datetime="datetime">{{ datetime }}</time>
        </div>
      </div>
      <div v-if="excerpt" class="blog__excerpt" v-html="excerpt"></div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRef, unref } from "vue"
import markup from "~/utils/markup"
import { Blog } from "../types/blog"

export default defineComponent({
  props: {
    blog: Object as PropType<Blog>
  },
  setup(props) {
    const blog = toRef(props, "blog")
    const title = computed(() => unref(blog)?.title)
    const excerpt = computed(() => markup(unref(blog)?.excerpt))
    const datetime = computed(() => unref(blog)?.createdAt)
    const tags = computed(() => unref(blog)?.tags)
    const artworkUrl = computed(() => unref(blog)?.artworkUrl)

    return { artworkUrl, title, excerpt, datetime, tags }
  }
})
</script>
