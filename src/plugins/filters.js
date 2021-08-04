import Vue from "vue"
import marked from "marked"
import PR from "highlight.js"

PR.configure({
  classPrefix: "prettyprint__"
})

function markup(markdown) {
  const options = {
    highlight(code, lang) {
      return PR.highlight(lang, code).value
    },
    langPrefix: "hljs prettyprint language-",
    smartLists: true
  }

  return marked(markdown, options)
}

Vue.filter("markup", markup)
