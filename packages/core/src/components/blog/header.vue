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
        <div
          class="blog__category txt-t--uppercase"
          style="margin-bottom: 1rem"
        >
          <div class="tag__list">
            <span
              v-for="tag in tags"
              :key="tag"
              class="tag"
              style="margin-right: 0.5rem"
              >{{ tag }}</span
            >
          </div>
          <time pubdate :datetime="datetime">{{ datetime }}</time>
        </div>
      </div>
      <Markup v-if="excerpt" class="blog__excerpt" :src="excerpt"></Markup>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRef } from 'vue'
import Markup from '~/components/markup'
import fluent from '~/types/fluent'

export default defineComponent({
  components: {
    Markup
  },
  props: {
    blog: {
      type: Object as PropType<fluent.Blog>,
      required: true
    }
  },
  setup(props) {
    const blog = toRef(props, 'blog')
    const title = computed(() => blog.value.title)
    const excerpt = computed(() => blog.value.excerpt)
    const tags = computed(() => blog.value.tags)
    const artworkUrl = computed(() => blog.value.artworkUrl)
    const datetime = computed(() => blog.value.createdAt)

    return { artworkUrl, title, excerpt, tags, datetime }
  }
})
</script>
