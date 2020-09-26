<template>
  <div id="app">
    <main role="main">
      <article v-if="blog" class="blog">
        <header
          class="header blog__summary"
          :class="blog.media ? 'd--flex flex--column sm:flex--row' : ''"
        >
          <div
            v-if="blog.media"
            class="blog__media"
            style="padding-bottom: 25%"
          >
            <el-image :src="blog.media" fit="contain" />
          </div>

          <div class="blog__description">
            <div class="blog__head">
              <h1 class="blog__headline">{{ blog.headline }}</h1>
              <div
                class="blog__category txt-t--uppercase"
                style="margin-bottom: 1rem"
              >
                <div class="tag__list">
                  <span class="tag" v-for="tag in blog.tags" :key="tag">{{
                    tag
                  }}</span>
                </div>
                <time pubdate :datetime="blog.timestamp">{{
                  blog.timestamp
                }}</time>
              </div>
            </div>
            <div
              class="blog__excerpt"
              v-if="blog.excerpt"
              :inner-html.prop="blog.excerpt | markup"
            ></div>
          </div>
        </header>
        <div
          class="blog__body"
          v-if="blog.content"
          :inner-html.prop="blog.content | markup"
        ></div>
      </article>
    </main>
  </div>
</template>

<script lang="ts">
import { Context } from "@nuxt/types/app";
import { Component, Vue } from "nuxt-property-decorator";
import { Blog } from "~/models/blog";
import { blogStore } from "~/store";
import darkModeEnabled from "~/utils/dark-mode";

@Component
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

  mounted() {
    darkModeEnabled();
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
