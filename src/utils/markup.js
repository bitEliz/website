import "marked";
import marked from "marked";

function markup(markdown, options = { snitize: true }, callback) {
  return marked(markdown, options, callback);
}

export default markup;
