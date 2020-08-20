<template>
  <div class="aki-resume">
    <vue-markdown
      :source="markdown"
      class="aki-resume__content"
    />
  </div>
</template>

<script>

import VueMarkdown from 'vue-markdown';
import http from '@utils/task';

export default {
  name: 'Resume',
  components: {
    VueMarkdown,
  },
  data() {
    return {
      markdown: '',
    };
  },
  mounted() {
    this.onLoading();
  },
  methods: {
    async onLoading() {
      this.markdown = await http('/static/resume');
    },
  },
};
</script>

<style lang="scss">
@import "@assets/css/common";

.aki-resume {
  .aki-resume__content {
    font-size: 14px;
    font-weight: $font-weight-light;
    color: $dark-gray;
    line-height: 1.8;
    max-width: 700px;
    min-width: 320px;
    margin: 2em auto;

    a:link {
      font-size: 1.25em;
      color: $link-highlight-color;
      text-decoration: none;

      &:hover {
        color: $link-highlight-color;
      }

      &:visited {
        color: $link-visited-color;
      }
    }

    h1 {
      font-size: 3em;
      font-weight: $font-weight-regular;
    }

    ul {
      padding: 0 20px 0;
    }

    hr {
      border: none;
      border-top: 1px solid #e6e6e6;
    }

    em {
      font-size: 0.8em;
      color: #aaa;
    }

    strong {
      font-weight: $font-weight-regular;
    }

    strong,
    code {
      font-family: Menlo, Consolas, Monaco, "Courier New", monospace, serif;
      color: #666666;
      font-size: 0.9em;
    }
  }
}
</style>
