<template>
  <main role="main" class="main" v-html="html"></main>
</template>

<script>
import marked from "marked";
import http from "@utils/task";

export default {
  name: "Resume",
  data() {
    return {
      html: "",
    };
  },
  mounted() {
    this.theme();
    this.onLoading();
  },
  methods: {
    theme() {
      var forceSetting = localStorage.getItem("forceDarkModeOn");
      var browserPrefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      var darkModeEnabled =
        forceSetting === "true" || (!forceSetting && browserPrefersDark);

      if (browserPrefersDark) {
        document.body.classList.toggle("has-darkmode", darkModeEnabled);
        document.body.classList.toggle("has-darkmode__forced", false);
      } else {
        document.body.classList.toggle("has-darkmode", true);
        document.body.classList.toggle("has-darkmode__forced", darkModeEnabled);
      }
    },

    async onLoading() {
      const markdown = await http("/static/resume");
      this.html = marked(markdown, { snitize: true });
    },
  },
};
</script>

<style lang="scss">
.main {
  margin: 0 auto;
  max-width: 798px;
  padding: 5em 1rem 3em;
  color: var(--black-900);

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
