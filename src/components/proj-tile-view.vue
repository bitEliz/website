<template>
  <a
    class="tile d--flex flex--column"
    :href="content.trackViewUrl ? content.trackViewUrl : undefined"
    target="_blank"
  >
    <div class="tile__media">
      <b-img-lazy :src="content.artworkUrl" fit="fit" />
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

  private get _formattedDatetime(): string {
    return (
      (this.content.startDate ?? "") + " - " + (this.content.endDate ?? "")
    );
  }
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
