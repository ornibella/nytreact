var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  main_headline: {
    type: String
  },
  web_url: {
    type: String
  },
  snippet: {
    type: String
  },
  pub_date: {
    type: Date
  },
  date: {
    type: Date
  }
});

var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;