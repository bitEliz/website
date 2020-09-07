<template>
  <main role="main" class="main" v-html="html"></main>
</template>

<script>
import markup from "@utils/markup";
import http from "@utils/task";
import darkModeEnabled from "@utils/dark-mode";

export default {
  name: "Markup",
  data() {
    return {
      markdown: "",
      html: "",
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  mounted() {
    darkModeEnabled();
    this.onLoading();
  },
  methods: {
    async onLoading() {
      this.markdown = await http(`/static/${this.id}`);
      this.html = markup(this.markdown);
    },
  },
};
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
