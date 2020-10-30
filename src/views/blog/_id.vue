<template>
  <main role="main">
    <article v-if="blog" class="blog">
      <v-blog-header-view :blog="blog" />
      <div
        class="blog__body"
        v-if="blog.content"
        :inner-html.prop="blog.content | markup"
      ></div>
    </article>
  </main>
</template>

<script lang="ts">
import { Context } from "@nuxt/types/app";
import { Component, Vue } from "nuxt-property-decorator";
import BlogHeaderView from "~/components/blog-header.vue";
import { Blog } from "~/models/blog";
import { blogStore } from "~/store";

@Component({
  components: {
    "v-blog-header-view": BlogHeaderView,
  },
})
export default class BlogView extends Vue {
  get blog(): Blog | undefined {
    return blogStore.blog;
  }

  async asyncData(context: Context) {
    try {
      await blogStore.onLoading(context);
    } catch (error) {
      context.error(error);
    }
  }
}
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
    border-bottom: 1px solid var(--black-075);
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
