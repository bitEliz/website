<script lang="ts">
import { computed, defineComponent, h, PropType, toRef } from "vue"
import Markup from "../components/markup"
import fluent from "~/types/fluent"

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<fluent.Project>,
      required: true
    }
  },
  components: {
    Markup
  },
  setup(props) {
    const data = toRef(props, "data")
    const trackViewUrl = computed(() => data.value.trackViewUrl)
    const imageUrl = computed(() => data.value.artworkUrl)
    const excerpt = computed(() => data.value.summary)

    return function () {
      const githubProps = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "5rem",
        height: "5rem",
        fill: "currentColor",
        class: "bi bi-github",
        viewBox: "0 0 16 16"
      }

      const children = [
        h("div", { class: "tile__media" }, [
          data.value?.isOpenSource && !imageUrl.value
            ? h(
                "svg",
                githubProps,
                h("path", {
                  d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                })
              )
            : h("img", { src: imageUrl.value, alt: "artwork" })
        ]),
        h("div", { class: "tile__description" }, [
          h(Markup, { class: "tile__excerpt", src: excerpt.value })
        ])
      ]
      return data.value?.trackViewUrl
        ? h("a", { class: "tile", href: trackViewUrl.value, target: "_blank" }, children)
        : h("div", { class: "tile" }, children)
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

  & &__media {
    margin-bottom: 1.5rem;
  }

  img,
  svg {
    width: 5rem;
    height: 5rem;
    border-radius: 1rem;
  }
}
</style>
