<template>
  <a
    class="tile d--flex flex--column"
    :class="!vertical ? 'sm:flex--row' : ''"
    :href="'/blog/' + blog.alias"
  >
    <div
      v-if="blog.artworkUrl"
      class="tile__media"
      :style="aspectRatio ? aspectRatio : ''"
    >
      <b-img-lazy :src="blog.artworkUrl" />
    </div>

    <div
      class="tile__description d--flex flex--column justify--space-between"
      aria-hidden="true"
    >
      <div class="tile__head">
        <div class="tile__category txt-t--uppercase">{{ blog.category }}</div>
        <div class="tile__headline">
          {{ blog.title }}
        </div>
      </div>

      <time class="tile__timestamp txt-t--uppercase" :datatime="blog.createdAt">
        {{ blog.createdAt }}
      </time>
    </div>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Blog } from "~/models/blog";

@Component
export default class BlogTileView extends Vue {
  @Prop({ required: true }) blog!: Blog;
  // Default aspect ratio is 16/9.
  // set value with formmat `padding-top: value`,
  // `value = (height / width) * 100%`.
  @Prop() aspectRatio?: string;
  @Prop({ default: true }) vertical!: boolean;
}
</script>

<style lang="scss">
.tile {
  width: 100%;
  background: var(--white);
  border-radius: 0.5rem;

  .tile__media {
    @include aspect-ratio(16, 9);
  }

  .tile__description {
    padding: 2rem;
    flex-grow: 1;
  }
}
</style>
