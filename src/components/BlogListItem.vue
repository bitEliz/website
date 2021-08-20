<template>
  <a
    class="tile d--flex flex--column"
    :class="!vertical ? 'sm:flex--row' : ''"
    :href="'/blog/' + blog?.alias ?? ''"
  >
    <div v-if="blog?.artworkUrl" class="tile__media" :style="aspectRatio ? aspectRatio : ''">
      <img :src="blog?.artworkUrl" />
    </div>

    <div class="tile__description d--flex flex--column justify--space-between" aria-hidden="true">
      <div class="tile__head">
        <div class="tile__category txt-t--uppercase">{{ blog?.tags }}</div>
        <div class="tile__headline">
          {{ blog?.title }}
        </div>
      </div>

      <time class="tile__timestamp txt-t--uppercase" :datatime="blog?.createdAt">
        {{ blog?.createdAt }}
      </time>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from "vue"
import fluent from "~/types/fluent"

export default defineComponent({
  props: {
    blog: {
      type: Object as PropType<fluent.Blog>,
      required: true
    },
    // Default aspect ratio is 16/9.
    // set value with formmat `padding-top: value`,
    // `value = (height / width) * 100%`.
    aspectRatio: String,
    vertical: Boolean
  },
  setup(props) {
    const blog = toRef(props, "blog")
    const aspectRatio = toRef(props, "aspectRatio")
    const vertical = toRef(props, "vertical")

    return {
      blog,
      aspectRatio,
      vertical
    }
  }
})
</script>

<style lang="scss">
.tile {
  width: 100%;
  background: white;
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
