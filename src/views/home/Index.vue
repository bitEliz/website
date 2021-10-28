<script lang="ts">
import { createVNode, defineComponent } from "vue"
import { useFetch } from "~/composables"
import Loading from "../../components/Loading.vue"

export default defineComponent({
  setup() {
    const { result, isLoading } = useFetch("")

    return () => {
      return isLoading.value
        ? createVNode(Loading)
        : createVNode("div", { id: "__h" }, [
            createVNode("header"),
            createVNode("main"),
            createVNode("footer")
          ])
    }
  }
})
</script>

<style lang="less">
@import "node_modules/ant-design-vue/lib/style/themes/default.less";
@import "node_modules/ant-design-vue/lib/style/mixins/clearfix.less";

body {
  margin: 0; // 1
  color: @text-color;
  font-size: @font-size-base;
  font-family: @font-family;
  line-height: @line-height-base;
  background-color: @body-background; // 2
}

#home {
  margin: 0 auto;
  padding: 3em 2rem;

  @media screen and (max-width: 576px) {
    padding: 3em 1rem;
  }

  max-width: 860px;
  .clearfix();

  header {
    position: fixed;
  }

  main {
    float: right;
    width: 500px;
  }

  footer {
    position: fixed;
    bottom: 3.5em;
  }

  @media screen and (max-width: 860px) {
    header {
      position: unset;
    }

    main {
      float: unset;
      width: unset;
    }

    footer {
      position: unset;
    }
  }
}
</style>
