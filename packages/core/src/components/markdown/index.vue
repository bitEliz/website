<template>
  <div v-html="html"></div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import HL from 'highlight.js/lib/common'

interface MarkdownProps {
  content?: string
  options?: marked.MarkedOptions
}

const props = defineProps<MarkdownProps>()
const options = {
  ...props.options,
  ...marked.defaults,
  highlight: (code: string, lang: string) =>
    HL.highlight(code, { language: lang }).value
}
const html = marked.parse(props.content || '', options)
</script>
