<template>
  <div class="aki-resume">
    <vue-markdown :source="markdown" class="aki-resume__content"></vue-markdown>
  </div>
</template>

<script>

import VueMarkdown from 'vue-markdown'
import hljs from 'highlight.js'
import task from '@/utils/task'
import 'highlight.js/styles/xcode.css'

export default {
  name: 'resume',
  components: {
    VueMarkdown,
  },
  data() {
    return {
      markdown: '',
    }
  },
  mounted() {
    task({ url: '/resume', method: 'GET' })
      .then((resp) => {
        this.markdown = resp.data
      })
      .catch((error) => {
        console.error(error)
      })
  },
  updated() {
    document.querySelectorAll('pre code').forEach((code) => {
      hljs.highlightBlock(code)
    })
  },
}
</script>

<style lang="scss">
  @import '@/styles/variables';
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

      strong, code {
        font-family: Menlo, Consolas, Monaco, "Courier New", monospace, serif;
        color: #666666;
        font-size: 0.9em;
      }
    }
  }

</style>
