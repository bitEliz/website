<template>
  <div id="app">
    <main role="main" class="main" :inner-html.prop="markdown | markup"></main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import darkModeEnabled from "@/utils/dark-mode";
import http from "@/utils/task";

@Component
export default class Static extends Vue {
  markdown: string = "";
  get id() {
    return this.$route.params.id;
  }
  mounted() {
    darkModeEnabled();
    this.onLoading();
  }

  async onLoading() {
    this.markdown = (await http(`/static/${this.id}`)) as string;
  }
}
</script>

<style lang="scss">
body {
  font-size: 15px;
  color: var(--black-900);
}

.main {
  margin: 0 auto;
  max-width: 798px;
  padding: 5em 1rem 3em;

  h1 {
    font-size: 3rem;
  }

  em {
    font-size: 0.8em;
    color: var(--black-400);
  }

  code {
    font-size: 0.9em;
    color: var(--black-800);
  }

  ul {
    @include list-unstyled();
  }

  hr {
    margin-bottom: 1rem;
  }
}
</style>
