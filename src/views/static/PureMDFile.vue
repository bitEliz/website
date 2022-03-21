<script lang="ts">
import { createVNode, defineComponent } from "vue"
import { useRoute } from "vue-router"
import Markup from "../../components/markup"
import Loading from "../../components/Loading.vue"
import { useFetch } from "../../composables"

export default defineComponent({
  setup() {
    const route = useRoute()
    const path = route.path.startsWith("/static") ? route.path : `/static${route.path}`
    const { result, isLoading } = useFetch(`/api/${path}.md`)

    return () => {
      return isLoading.value
        ? createVNode(Loading)
        : createVNode("div", { id: "__file" }, [
            createVNode("main", null, [createVNode(Markup, { src: result.value })])
          ])
    }
  }
})
</script>

<style lang="less">
@import "node_modules/ant-design-vue/lib/style/mixins/index.less";
@import "node_modules/ant-design-vue/lib/style/core/base.less";
@import "node_modules/ant-design-vue/lib/style/core/global.less";
@import "node_modules/ant-design-vue/lib/style/variable.less";

#__file {
  main {
    margin: 0 auto;
    max-width: 798px;
    min-width: 320px;
    padding: 5em 1.75rem 3em;

    ul {
      list-style: none;
      padding-left: 0;
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
