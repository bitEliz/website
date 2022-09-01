<template>
  <div
    class="cell"
    :class="axis === 'horizontal' ? 'flex-row align-items-center' : ''"
    :style="borderRadiusProp"
  >
    <div
      v-if="data.artworkUrl"
      class="cell-media"
      :class="
        axis === 'horizontal'
          ? aspectRatio
            ? 'col-4 ratio'
            : 'col-4'
          : aspectRatio
          ? 'ratio'
          : ''
      "
      :style="aspectRatioProp"
    >
      <img :src="data.artworkUrl" :alt="data.title" />
    </div>
    <div
      class="cell-description d-flex flex-column justify-content-between"
      :class="axis === 'horizontal' ? 'col-8' : ''"
    >
      <div class="cell-head">
        <div class="category fs-8 text-secondary text-uppercase mb-1">Tag</div>
        <h4 class="text-dark">{{ data.title }}</h4>
      </div>
      <time
        class="timestamp fs-7 text-secondary txt-uppercase"
        :datatime="data.createdAt"
        v-if="data.createdAt"
      >
        {{ data.createdAt }}
      </time>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    axis?: 'horizontal' | 'vertical'
    aspectRatio?: number
    borderRadius?: string
    data: {
      artworkUrl?: string
      tags?: Array<string>
      title: string
      createdAt?: string
    }
  }>(),
  {
    axis: 'vertical',
    aspectRatio: 0.5625
  }
)

const aspectRatioProp =
  props.aspectRatio && `--bs-aspect-ratio: ${props.aspectRatio * 100}%`
const borderRadiusProp =
  props.borderRadius && `--bs-cell-border-radius: ${props.borderRadius}`
</script>

<style lang="scss" scoped>
.cell {
  // scss-docs-start cell-css-vars
  --#{$prefix}cell-spacer-y: #{$card-spacer-y};
  --#{$prefix}cell-spacer-x: #{$card-spacer-x};
  --#{$prefix}cell-title-spacer-y: #{$card-title-spacer-y};
  --#{$prefix}cell-border-width: #{$card-border-width};
  --#{$prefix}cell-border-color: #{$card-border-color};
  --#{$prefix}cell-border-radius: 1rem;
  --#{$prefix}cell-box-shadow: #{$card-box-shadow};
  --#{$prefix}cell-height: #{$card-height};
  --#{$prefix}cell-color: #{$card-color};
  --#{$prefix}cell-bg: #{$card-bg};

  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: var(--#{$prefix}cell-height);
  word-wrap: break-word;
  background-color: var(--#{$prefix}cell-bg);
  background-clip: border-box;
  border: var(--#{$prefix}cell-border-width) solid
    var(--#{$prefix}cell-border-color);
  @include border-radius(var(--#{$prefix}cell-border-radius));
  @include box-shadow(var(--#{$prefix}cell-box-shadow));

  &-description {
    // Enable `flex-grow: 1` for decks and groups so that card blocks take up
    // as much space as possible, ensuring footers are aligned to the bottom.
    flex: 1 1 auto;
    padding: var(--#{$prefix}cell-spacer-y) var(--#{$prefix}cell-spacer-x);
    color: var(--#{$prefix}cell-color);
  }

  &-media img {
    @include border-top-radius(var(--#{$prefix}cell-border-radius));
  }

  &.flex-row {
    border: none;
    --bs-cell-border-radius: 0.5rem;

    @include media-breakpoint-up(lg) {
      --bs-cell-border-radius: 1rem;
    }

    .cell-media {
      &.col-4 {
        width: 33.33333333% !important;
      }

      img {
        @include border-radius(var(--#{$prefix}cell-border-radius));
      }
    }
  }
}
</style>
