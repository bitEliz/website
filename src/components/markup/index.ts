import { computed, createVNode, defineComponent, ref, PropType } from "vue"
import marked from "marked"
import HL from "highlight.js"

export default defineComponent({
  props: {
    src: String,
    options: {
      type: Object as PropType<marked.MarkedOptions>,
      default: Object.assign({}, marked.defaults, {
        highlight: (code: string, lang: string) => HL.highlight(lang, code).value
      })
    }
  },
  setup: function (props, context) {
    const src = ref(props.src)

    marked.setOptions(props.options)

    const innerHTML = computed(() => marked(src.value ?? ""))

    return function () {
      return src.value
        ? createVNode("div", {
            innerHTML: innerHTML.value
          })
        : null
    }
  }
})
