<template>
  <main id="__blog" class="container">
    <BlogHeader :blog="blog" />
    <article v-if="blog">
      <Markdown :content="blog.content"></Markdown>
    </article>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: blog } = await useFetch(`/api/blog/${route.params.id}`)
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
