<template>
  <vue-markdown class="main" role="main" :source="markdown" />
</template>

<script>
import markdown from "vue-markdown";
import http from "@utils/task";

export default {
  name: "Resume",
  components: {
    "vue-markdown": markdown,
  },
  data() {
    return {
      markdown: "",
    };
  },
  mounted() {
    this.onLoading();
  },
  methods: {
    async onLoading() {
      this.markdown = await http("/static/resume");
    },
  },
};
</script>

<style lang="scss">
@import "@assets/css/common";

.main {
  margin: 0 auto;
  max-width: 798px;
  padding: 5rem 1rem 2rem 1rem;

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
}
</style>
