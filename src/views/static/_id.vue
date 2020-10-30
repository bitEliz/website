<template>
    <main role="main" class="main" :inner-html.prop="markdown | markup" />
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import darkModeEnabled from "@/utils/dark-mode";
import { pureMDFileStore } from "~/store";
import { Context } from '@nuxt/types';

@Component
export default class PureMDFileView extends Vue {
  get markdown(): string {
    return pureMDFileStore.markdown;
  }

  mounted() {
    darkModeEnabled();
  }

  async asyncData(context: Context) {
    try {
      await pureMDFileStore.onLoading(context);
    } catch (error) {
      context.error(error);
    }
  }
}
</script>

<style lang="scss">

body {
  font-size: 90%;
  color: var(--black-900);
}

.main {
  margin: 0 auto;
  max-width: 798px;
  padding: 5em 1rem 3em;

  h1 {
    font-size: 3rem;
  }

  ul {
    @include list-unstyled();
  }

  hr {
    margin-bottom: 1rem;
  }
}
</style>
