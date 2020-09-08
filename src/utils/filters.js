import marked from "marked";

const markup = (markdown, options = { snitize: true }, callback) =>
  marked(markdown, options, callback);

export default { markup };
