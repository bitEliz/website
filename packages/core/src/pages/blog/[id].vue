<template>
  <main id="__blog">
    <article v-if="blog">
      <BlogHeader :blog="blog" />
      <Markup class="article" :src="innerHtml"></Markup>
    </article>
  </main>
</template>

<script setup lang="ts">
import fluent from '@/types/fluent'

const blog = ref<fluent.Blog>()
const route = useRoute()
const innerHtml = computed(() => blog.value?.content)
const loadData = async () => {
  try {
    const response = await fetch(`/blog/${route.params.id}`)
    blog.value = await response.json()
  } catch (error) {
    handleError(error)
  }
}
const handleError = (error: any) => void 0
</script>

<style lang="scss">
#__blog {
  max-width: 798px;
  min-width: 320px;
  padding: 2rem 2rem;
  margin: 0 auto;

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
