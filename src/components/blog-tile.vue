<template>
  <a
    class="tile d--flex flex--column"
    :class="layoutDirection === direction.horizontal ? 'sm:flex--row' : ''"
  >
    <div class="tile__media" :style="aspectRatio" aria-hidden="true">
      <el-image
        :src="blog.media"
        fit="contain"
      />
    </div>

    <div
      class="tile__description d--flex flex--column justify--space-between"
      aria-hidden="true"
    >
      <div class="tile__head">
        <div class="tile__category txt-t--uppercase">{{ blog.category }}</div>
        <div class="tile__headline">
          {{ blog.headline }}
        </div>
      </div>

      <time
        class="tile__timestamp txt-t--uppercase"
        :datatime="blog.timestamp"
      >
        {{ blog.timestamp }}
      </time>
    </div>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Blog } from "~/models/blog";
import { LayoutDirection } from "~/models/layout-direction";

@Component
export default class BlogTileView extends Vue {
  @Prop({ required: true }) blog!: Blog;
  @Prop({ default: "padding-bottom: 75%" }) aspectRatio!: string;
  @Prop({ default: false }) layoutDirection!: LayoutDirection;
  private get direction() {
    return LayoutDirection;
  }
}
</script>

<style lang="scss">
.tile {
  width: 100%;
  background: var(--white);

  .tile__media {
    position: relative;
    width: 100%;
    height: 0;

    .el-image {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
