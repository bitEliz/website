import {
  App,
  computed,
  createVNode,
  defineComponent,
  PropType,
  toRef
} from 'vue'
import { marked } from 'marked'
import HL from 'highlight.js/lib/common'

const Markup = defineComponent({
  props: {
    src: String,
    options: {
      type: Object as PropType<marked.MarkedOptions>,
      default: Object.assign({}, marked.defaults, {
        highlight: (code: string, lang: string) =>
          HL.highlight(lang, code).value
      })
    }
  },
  setup: function (props) {
    const src = toRef(props, 'src')

    marked.setOptions(props.options)

    const innerHTML = computed(() => marked(src.value ?? ''))

    return function () {
      return src.value
        ? createVNode('div', {
            innerHTML: innerHTML.value
          })
        : null
    }
  }
})

Markup.install = function (app: App) {
  app.component(Markup.name, Markup)
  return app
}
export default Markup
