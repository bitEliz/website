<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import Markup from "../../components/markup"
import Loading from "../../components/Loading.vue"
import { useFetch } from "@vueuse/core"

const route = useRoute()
const path = route.path.startsWith("/static") ? route.path : `/static${route.path}`
const { isFetching: isLoading, data } = useFetch(`/api/${path}.md`).get().text()
const text = computed(() => data.value || "")
</script>

<template>
  <Loading v-if="isLoading" />
  <div id="__file" v-else>
    <main>
      <Markup :src="text"></Markup>
    </main>
  </div>
</template>

<style lang="scss">
#__file {
  font-size: $font-size-sm;

  a {
    color: black;
  }

  main {
    margin: 0 auto;
    max-width: 798px;
    min-width: 320px;
    padding: 5em 1.75rem 3em;

    ul {
      padding-left: 0;
      list-style: none;
    }

    code {
      font-size: 0.9em;
      color: #242729;
    }

    hr {
      box-sizing: content-box;
      height: 0;
      overflow: visible;
      border: none;
      border-top: 1px solid #e4e6e8;
      margin-bottom: 1em;

      &:last-child {
        display: none;
      }
    }

    em {
      font-size: 0.8em;
      color: #848d95;
    }
  }
}
</style>
