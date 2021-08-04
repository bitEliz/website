<template>
  <a class="tile" :href="link" target="_blank">
    <div class="tile__media">
      <img :src="imageUrl" alt="" />
    </div>
    <div class="tile__description">
      <div class="tile__excerpt" :inner-html.prop="excerpt | markup" />
    </div>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"
import { Project } from "~/models/resume"

@Component
export default class ProjectTileView extends Vue {
  @Prop() content!: Project

  get link(): string | undefined {
    return this.content.trackViewUrl
  }

  get imageUrl(): string | undefined {
    return this.content.artworkUrl
  }

  get excerpt(): string | undefined {
    return this.content.summary
  }
}
</script>

<style lang="scss">
.tile {
  width: 100%;
  display: block;
  background: var(--white);
  border-radius: 0.5rem;

  %margin-bottom {
    margin-bottom: 1.5rem;
  }

  & &__media {
    @extend %margin-bottom;
  }
}
</style>
