<script lang="ts">
import { computed, createVNode, defineComponent, PropType, toRef } from "vue"
import Markup from "../components/markup"
import { GithubFilled } from "@ant-design/icons-vue"
import fluent from "~/types/fluent"

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<fluent.Project>,
      required: true
    }
  },
  components: {
    GithubFilled,
    Markup
  },
  setup(props) {
    const data = toRef(props, "data")
    const trackViewUrl = computed(() => data.value.trackViewUrl)
    const imageUrl = computed(() => data.value.artworkUrl)
    const excerpt = computed(() => data.value.summary)

    return function () {
      var children = [
        createVNode("div", { class: "tile__media" }, [
          data.value?.isOpenSource && !imageUrl.value
            ? createVNode(GithubFilled)
            : createVNode("img", { src: imageUrl.value, alt: "artwork" })
        ]),
        createVNode("div", { class: "tile__description" }, [
          createVNode(Markup, { class: "tile__excerpt", src: excerpt.value })
        ])
      ]
      return data.value?.trackViewUrl
        ? createVNode("a", { class: "tile", href: trackViewUrl.value, target: "_blank" }, children)
        : createVNode("div", { class: "tile" }, children)
    }
  }
})
</script>

<style lang="scss">
.tile {
  width: 100%;
  display: block;
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
  padding-bottom: 1rem;

  %margin-bottom {
    margin-bottom: 1.5rem;
  }

  & &__media {
    @extend %margin-bottom;
  }

  img,
  svg {
    width: 5rem;
    height: 5rem;
    border-radius: 1rem;
  }
}
</style>
