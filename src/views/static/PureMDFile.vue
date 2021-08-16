<template>
  <div id="__file">
    <main>
      <article v-html="innerHtml" />
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, unref } from "vue"
import { useRoute } from "vue-router"
import markup from "~/utils/markup"

export default defineComponent({
  setup() {
    const file = ref<string | undefined>()
    const innerHtml = computed(() => markup(unref(file)))
    const route = useRoute()

    const loadFile = async () => {
      try {
        const path = route.path.startsWith("/static") ? route.path : `/static${route.path}`
        console.log(path)
        file.value = await (await fetch(path + ".md")).json()
      } catch (error) {
        handleError(error)
      }
    }

    const handleError = (error: Error) => {}

    onMounted(loadFile)

    return {
      innerHtml,
      loadFile
    }
  }
})
</script>

<style lang="scss" scoped>
#__file {
  color: #3c4146;
  font-size: 85%;

  main {
    margin: 0 auto;
    max-width: 798px;
    min-width: 320px;
    padding: 5em 1.75rem 3em;

    article {
      h1 {
        font-size: 2em; // Fix size in article.
      }

      ul {
        list-style: none;
        padding-left: 0;
      }

      hr {
        margin-bottom: 1rem;
      }

      em {
        font-size: 0.8em;
        color: inherit;
      }
    }
  }
}
</style>
