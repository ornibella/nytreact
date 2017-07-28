// Include React
var React = require("react");

// Helper for making AJAX requests to our API
var helpers = require("../utils/helpers");

// Creating the Results component
var Results = React.createClass({

  getInitialState: function() {
    return { 
      article: {}
     };
  },

 // When a user clicks on 'Save'...
  handleClick: function(article) {
   
   console.log("Save pressed!", article);
   var headline = article.headline.main;
   var url = article.web_url;
   var snippet = article.snippet;
   var date = article.pub_date;

   helpers.postSaved(headline, url, snippet, date)
      .then(function(data, err){
        if (err) {
          console.log("error in helpers.postSaved");
        }
        console.log("this is the data in console.log in the handClick: ", data);

         helpers.getSaved().then(function(response) {
            console.log(response);
            if (response !== this.state.savedArticles) {
              console.log("Saved Articles", response.data);
              this.props.setSavedArticles(response.data);
            }
          }.bind(this));

      }.bind(this))

  },

  // Here we render the function
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h2 className="panel-title text-center" style={{fontSize: 25 + 'px', fontWeight: 'bold', color: 'blue'}}>Search Results</h2>
        </div>
        <div className="panel-body">

          {/* Here we use a map function to loop through an array in JSX */}
          {this.props.results.map(function(article, i) {
            return (
              <div className = "row" key={i}>
                <div className="col-md-10">
                  <h2><a href={article.web_url}>{article.headline.main}</a></h2>
                  <p>{article.snippet}</p>
                  <p>Published: {article.pub_date}</p>
                </div>
                <div className="col-md-2 btn-col">
                  <button onClick={this.handleClick.bind(this, article)} className="btn btn-success" style={{marginLeft: 25 + '%', marginTop: 25 + '%'}}>
                    Save
                  </button>
                </div>
              </div>
            );
          }.bind(this))}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;
