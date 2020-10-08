<template>
  <div id="app">
    <main role="main" class="main">
      <article :inner-html.prop="markdown | markup"></article>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import darkModeEnabled from "@/utils/dark-mode";
import { apiStore } from "~/store";
import { Context } from "@nuxt/types";

@Component
export default class ApiView extends Vue {
  get markdown(): string {
    return apiStore.markdown;
  }

  mounted() {
    darkModeEnabled();
  }

  async asyncData(context: Context) {
    try {
      await apiStore.onLoading(context);
    } catch (error) {
      context.error(error);
    }
  }
}
</script>

<style lang="scss">
.main {
  max-width: 798px;
  min-width: 320px;
  margin: 0 auto;
  padding: 2rem;

//   article {
//     header {
//       border-bottom: 1px solid var(--black-075);
//       margin-bottom: 2.5rem;
//     }

//     h1,
//     h2,
//     h3 {
//       font-weight: normal;
//       padding-top: 1rem;
//     }

//     h1 {
//       font-size: 3rem;
//     }

//     h2 {
//       font-size: 2.5rem;
//     }

//     ul {
//       list-style: disc;
//     }

//     ul,
//     ol {
//       padding-left: 40px;
//       margin: 1em 0;
//     }
//   }
}
</style>
