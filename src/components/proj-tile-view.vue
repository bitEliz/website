<template>
  <a
    class="tile d--flex flex--column"
    :href="content.trackViewUrl"
    target="_blank"
  >
    <div class="tile__media">
      <img :src="content.artworkUrl" />
    </div>
    <div class="tile__description d--flex flex--column justfy--space-between">
      <div class="tile__excerpt" :inner-html.prop="content.summary | markup" />
    </div>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Project } from "~/models/resume";

@Component
export default class ProjectTileView extends Vue {
  @Prop() content!: Project;
}
</script>

<style lang="scss">
.tile {
  width: 100%;
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
