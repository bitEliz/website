<template>
  <div id="__file">
    <main>
      <article :inner-html.prop="markdown | markup" />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import darkModeEnabled from "@/utils/dark-mode";
import { Context } from "@nuxt/types";
import { pureMDFileStore } from "~/store";

@Component
export default class PureMDFileView extends Vue {
  get markdown(): string {
    return pureMDFileStore.markdown;
  }

  head() {
    return {
      htmlAttrs: {
        lang: "zh-CN",
      },
    };
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
:lang(zh) {
  line-height: 1.6;
}

#__file {
  color: var(--black-700);
  font-size: 85%;

  main {
    margin: 0 auto;
    max-width: 798px;
    min-width: 320px;
    padding: 5em 1.75rem 3em;

    article {
      h1 {
        font-size: 2em; // Fix size in article.
      }

      ul {
        @include list-unstyled();
      }

      hr {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
