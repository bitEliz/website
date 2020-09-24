import Vue from "vue";
import marked from "marked";
import PR from "highlight.js";
import swift from "highlight.js/lib/languages/swift";

PR.configure({
  classPrefix: 'prettyprint__'     // don't append class prefix
});

PR.registerLanguage("swift", swift);

function markup(markdown) {
  const options = {
    highlight: function (code, lang) {
        console.log(lang, code);
      // return prettyPrint.prettyPrint()
      return PR.highlight(lang, code).value;
    },
    langPrefix: "hljs prettyprint language-",
    smartLists: true,
  };

  return marked(markdown, options);
}

Vue.filter("markup", markup);
