<template>
  <div class="grid" style="--bs-gap: 1rem" v-for="g in galleries">
    <div class="g-col-12 g-col-md-6 g-col-lg-4" v-for="e in g">
      <a :href="e.trackViewUrl" target="_blank">
        <Tile
          class="text-body border-light"
          :data="{ title: e.name }"
          aspect-ratio="6rem"
        >
          <template #media>
            <div class="p-3 pb-0">
              <SymbolsGithub v-if="e.isOpenSource && !e.artworkUrl" />
              <img :src="e.artworkUrl" alt="" v-else />
            </div>
          </template>
          <template #excerpt>
            <Markdown class="tile-excerpt" :content="e.summary" />
          </template>
        </Tile>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Project } from '@/models'

const { galleries } = defineProps<{ galleries: Array<Array<Project>> }>()
</script>

<style lang="scss" scoped>
.grid {
  &:not(:last-child) {
    padding-bottom: var(--#{$prefix}gap);
  }

  .tile {
    img,
    svg {
      height: 100%;
      @include border-radius(1rem);
    }
  }
}
</style>
