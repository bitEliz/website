<template>
  <div v-html="html"></div>
</template>

<script lang="ts">
import { marked } from 'marked'
import HL from 'highlight.js/lib/common'
import { PropType } from 'vue'

export default defineComponent({
  props: {
    content: String,
    options: Object as PropType<marked.MarkedOptions>
  },
  setup({ content, options }) {
    const markedOptions = {
      ...options,
      ...marked.defaults,
      highlight: (code: string, lang: string) =>
        HL.highlight(code, { language: lang }).value
    }
    const html = content && marked.parse(content, markedOptions)
    return { html }
  }
})
</script>
