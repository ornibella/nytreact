
var axios = require("axios");

var nytimsAPI = "e67cc947d8604b06af1b2f9b7d6a703d";

var helper = {


  runQuery: function(params) {

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    var topic = params.topic;
    var start = params.start + "0101";
    var end = params.end + "1231";

    return axios.get(url, {
      params: {
          'api-key': nytimsAPI,
          'q': topic,
          'begin_date': start,
          'end_date': end
      }
    })

    .then(function(results){
      console.log("NYTimes API results: ", results.data.response.docs);
      return results.data.response.docs;

    });
  },


  getSaved: function() {
    return axios.get("/api");
  },


  postSaved: function(headline, url, snippet, date) {
    var newArticle = {headline: headline, url: url, date: date, snippet: snippet};
    console.log("helper postSaved article", newArticle);
    return axios.post("/api", newArticle)
      .then(function(results, err){
        if (err) {
          console.log("Error in helpers.js: ", err);
        } 
        else {
          console.log("Saved to Mongo", results._id);
          return results._id;
        }
    });
  },

  deleteArticle: function(id) {
    
    console.log("id inside deleteArtilce helper.js: ", id);
    return axios.delete("/api", {
      params: {_id: id}
    }) .then(function(results, err){
        if (err) {
          console.log("Error in helpers.js: ", err);
        } 
        else {
          console.log("Deleted from Mongo");
          return result;
        }
    });  
  }

};

module.exports = helper;