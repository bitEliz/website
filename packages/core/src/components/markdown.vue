<template>
  <div v-html="html"></div>
</template>

<script lang="ts">
import { marked } from 'marked'
import HL from 'highlight.js/lib/common'

interface MarkdownProps {
  content?: string
  options?: marked.MarkedOptions
}

export default defineComponent((props: MarkdownProps) => {
  const options = {
    ...props.options,
    ...marked.defaults,
    highlight: (code: string, lang: string) =>
      HL.highlight(code, { language: lang }).value
  }
  const html = marked.parse(props.content || '', options)
  return { html }
})
</script>
