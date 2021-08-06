import marked from "marked"
import PR from "highlight.js"

PR.configure({
  classPrefix: "prettyprint__"
})

var markup = function markup(literal) {
  if (!literal) {
    return
  }

  const options = {
    highlight(code, lang) {
      return PR.highlight(lang, code).value
    },
    langPrefix: "hljs prettyprint language-",
    smartLists: true
  }

  return marked(literal, options).trim()
}

export default markup
