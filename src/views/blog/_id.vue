<template>
  <main role="main">
    <article v-if="blog" class="blog">
      <BlogHeader :blog="blog" />
      <div v-if="blog.content" class="blog__body" v-html="innerHtml"></div>
    </article>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref } from "vue"
import { useRoute } from "vue-router"
import { Blog } from "../../types/blog"
import BlogHeader from "../../components/BlogHeader.vue"
import markup from "~/utils/markup"

export default defineComponent({
  components: {
    BlogHeader
  },
  setup() {
    const blog = ref<Blog>()
    const route = useRoute()
    const innerHtml = computed(() => markup(unref(blog)?.content))
    const loadData = async () => {
      try {
        const response = await fetch(`/blog/${route.params.id}`)
        blog.value = await response.json()
      } catch (error) {
        handleError(error)
      }
    }
    const handleError = (error: any) => void 0
    return {
      blog,
      innerHtml,
      loadData
    }
  }
})
</script>

<style lang="scss">
.blog {
  max-width: 798px;
  min-width: 320px;
  padding: 2rem 2rem;
  margin: 0 auto;
}

article {
  header {
    border-bottom: 1px solid #e4e6e8;
    margin-bottom: 2.5rem;
  }

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
</style>
