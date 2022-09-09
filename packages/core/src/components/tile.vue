<template>
  <div
    class="tile"
    :class="
      layoutDirection === 'horizontal' ? 'flex-row align-items-center' : ''
    "
    :style="borderRadiusProp"
  >
    <div
      v-if="data.artworkUrl"
      class="tile-media"
      :class="
        layoutDirection === 'horizontal'
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
      class="tile-description d-flex flex-column justify-content-between"
      :class="layoutDirection === 'horizontal' ? 'col-8' : ''"
    >
      <div class="tile-head">
        <div class="tile-label fs-8 text-secondary text-uppercase mb-1">
          Tag
        </div>
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
    layoutDirection?: 'horizontal' | 'vertical'
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
    layoutDirection: 'vertical',
    aspectRatio: 0.5625
  }
)

const aspectRatioProp =
  props.aspectRatio && `--bs-aspect-ratio: ${props.aspectRatio * 100}%`
const borderRadiusProp =
  props.borderRadius && `--bs-tile-border-radius: ${props.borderRadius}`
</script>

<style lang="scss" scoped>
.tile {
  // scss-docs-start tile-css-vars
  --#{$prefix}tile-spacer-y: #{$card-spacer-y};
  --#{$prefix}tile-spacer-x: #{$card-spacer-x};
  --#{$prefix}tile-title-spacer-y: #{$card-title-spacer-y};
  --#{$prefix}tile-border-width: #{$card-border-width};
  --#{$prefix}tile-border-color: #{$card-border-color};
  --#{$prefix}tile-border-radius: 1rem;
  --#{$prefix}tile-box-shadow: #{$card-box-shadow};
  --#{$prefix}tile-height: #{$card-height};
  --#{$prefix}tile-color: #{$card-color};
  --#{$prefix}tile-bg: #{$card-bg};

  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: var(--#{$prefix}tile-height);
  word-wrap: break-word;
  background-color: var(--#{$prefix}tile-bg);
  background-clip: border-box;
  border: var(--#{$prefix}tile-border-width) solid
    var(--#{$prefix}tile-border-color);
  @include border-radius(var(--#{$prefix}tile-border-radius));
  @include box-shadow(var(--#{$prefix}tile-box-shadow));

  &-description {
    // Enable `flex-grow: 1` for decks and groups so that card blocks take up
    // as much space as possible, ensuring footers are aligned to the bottom.
    flex: 1 1 auto;
    padding: var(--#{$prefix}tile-spacer-y) var(--#{$prefix}tile-spacer-x);
    color: var(--#{$prefix}tile-color);
  }

  &-media img {
    @include border-top-radius(var(--#{$prefix}tile-border-radius));
  }

  &.flex-row {
    border: none;
    --#{$prefix}-tile-border-radius: 0.5rem;

    @include media-breakpoint-up(lg) {
      --#{$prefix}-tile-border-radius: 1rem;
    }

    .tile-media {
      &.col-4 {
        width: 33.33333333% !important;
      }

      img {
        @include border-radius(var(--#{$prefix}tile-border-radius));
      }
    }
  }
}
</style>
