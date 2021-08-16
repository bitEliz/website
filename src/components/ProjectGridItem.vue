<template>
  <a
    class="tile"
    :href="link"
    target="_blank"
    :style="content.trackViewUrl ? 'cursor: pointer;' : 'cursor: default;'"
  >
    <div class="tile__media">
      <GithubFilled v-if="content.isOpenSource && !imageUrl" />
      <img v-else :src="imageUrl" alt="artwork" />
    </div>
    <div class="tile__description">
      <div class="tile__excerpt" v-html="excerpt" />
    </div>
  </a>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRef, unref } from "vue"
import { Project } from "../types/resume"
import markup from "../utils/markup"
import { GithubFilled } from "@ant-design/icons-vue"

export default defineComponent({
  props: {
    content: Object as PropType<Project>
  },
  components: {
    GithubFilled
  },
  setup(props) {
    const content = toRef(props, "content")
    const link = computed(() => unref(content)?.trackViewUrl)
    const imageUrl = computed(() => unref(content)?.artworkUrl)
    const excerpt = computed(() => markup(unref(content)?.summary))
    return {
      link,
      imageUrl,
      excerpt
    }
  }
})
</script>

<style lang="scss">
.tile {
  width: 100%;
  display: block;
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
  padding-bottom: 1rem;

  %margin-bottom {
    margin-bottom: 1.5rem;
  }

  & &__media {
    @extend %margin-bottom;
  }

  img,
  svg {
    width: 5rem;
    height: 5rem;
    border-radius: 8px;
  }
}
</style>
