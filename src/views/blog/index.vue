<template>
  <div id="app" class="blog">
    <main role="main">
      <section class="blog__lastest" v-if="latestBlog.length">
        <div class="wrapper">
          <h1>Latest Blog</h1>
          <ul
            class="blog__item-list list--unstyled d--flex flex--column sm:flex--row sm:flex--wrap"
          >
            <li
              class="blog__item"
              v-for="(blog, index) in latestBlog"
              :key="blog.id"
              :class="index === 0 ? 'f-b--100' : index > 2 ? 'f-b--1/3' : ''"
            >
              <BlogTileView
                :blog="blog"
                :vertical="index !== 0"
                :aspectRatio="
                  index === 0 ? 'padding-top: 37.5%' : undefined
                "
              />
            </li>
          </ul>
        </div>
      </section>
      <section class="blog__featured" v-if="featuredBlog.length">
        <h1>Featured Blog</h1>
      </section>
      <section class="blog__more--trunked" v-if="trunkedBlog.length">
        <div class="wrapper">
          <h1>More Blog</h1>
          <ul
            class="blog__item-list list--unstyled d--flex flex--column sm:flex--row flex--wrap"
            style="margin-bottom: 0"
          >
            <li
              class="blog__item"
              v-for="blog in trunkedBlog"
              :key="blog.id"
            >
              <BlogTileView
                :blog="blog"
                :vertical="false"
                :aspectRatio="'padding-top: 28.88%'"
              />
            </li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { Context } from "@nuxt/types/app";
import { Component, Vue } from "nuxt-property-decorator";
import BlogTileView from "~/components/blog-tile.vue";
import { Blog } from "~/models/blog";
import { blogListStore } from "~/store";

@Component({
  components: {
    BlogTileView,
  },
})
export default class BlogListView extends Vue {
  get latestBlog(): Array<Blog> {
    return blogListStore.latestBlog;
  }

  get featuredBlog(): Array<Blog> {
    return blogListStore.featuredBlog;
  }

  get trunkedBlog(): Array<Blog> {
    return blogListStore.trunkedBlog;
  }

  async asyncData(context: Context): Promise<void> {
    try {
      await blogListStore.onLoading(context);
    } catch (error) {
      context.error(error);
    }
  }
}
</script>

<style lang="scss">

.blog {
  background: var(--black-025);

  .blog__item-list {
    $blog__item-padding: 2rem;
    margin-right: -$blog__item-padding;

    .blog__item {
      display: flex;
      margin-right: $blog__item-padding;
      margin-bottom: $blog__item-padding;
      flex-basis: calc(50% - #{$blog__item-padding});

      &.f-b--100 {
        flex-basis: 100%;
      }

      &.f-b--1\/3 {
        flex-basis: calc(100% / 3 - #{$blog__item-padding});
      }
    }
  }
}
</style>
