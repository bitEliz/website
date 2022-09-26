<template>
  <main id="__blog">
    <div class="container">
      <BlogFrontMatter
        :title="blog.title"
        :artwork-url="blog.artworkUrl"
        :excerpt="blog.excerpt"
        :tags="blog.tags"
        :created-at="blog.createdAt || ''"
      />
      <article v-if="blog">
        <Markdown :content="blog.content || ''"></Markdown>
      </article>
    </div>
  </main>
</template>

<script setup lang="ts">
import { firstOne } from '@/utils'

const route = useRoute()
const store = useBlogStore()
const { data: blog } = storeToRefs(store)

onServerPrefetch(async () => {
  if (import.meta.env.SSR) {
    await store.fetch(firstOne(route.params.id) || '')
  }
})
</script>

<style lang="scss">
#__blog {
  header {
    border-bottom: 1px solid #e4e6e8;
    margin-bottom: 2.5rem;
  }

  article {
    h1,
    h2,
    h3 {
      font-weight: normal;
      padding-top: 1rem;
    }

    h1 {
      font-size: 3rem;
    }

    h2 {
      font-size: 2.5rem;
    }

    ul {
      list-style: disc;
    }

    ul,
    ol {
      padding-left: 40px;
      margin: 1em 0;
    }
  }
}
</style>
