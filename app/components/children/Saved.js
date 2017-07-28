// Include React
var React = require("react");
var helpers = require("../utils/helpers");

// This is the Saved component. It will be used to show saved articles.
var Saved = React.createClass({

  getInitialState: function() {
    return { 
      savedArticles: this.props.savedArticles
     };
  },

  // When a user clicks on 'Delete'...
  handleClick: function(article) {
   
  var id = article._id;
   console.log("Delete pressed!", id); 

  helpers.deleteArticle(id)
      .then(function(data, err){
        if (err) {
          console.log("error in helpers.deleteArticle")
        }
        console.log("this is the data in console.log in the handClick: ", data);

           helpers.getSaved().then(function(response) {
            console.log(response);
            if (response !== this.state.savedArticles) {
              console.log("Refreshed Saved Articles", response.data);
              this.props.setSavedArticles(response.data);
            }
          }.bind(this));

      }.bind(this))

  },

  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h2 className="panel-title text-center" style={{fontSize: 25 + 'px', fontWeight: 'bold', color: 'blue'}}>Saved Articles</h2>
        </div>
        <div className="panel-body">

          {/* Here we use a map function to loop through an array in JSX */}
          {this.props.savedArticles.map(function(article, i) {
            return (
              <div key={i} className="row">
                <div className="col-md-10">
                  <h2><a href={article.web_url}>{article.main_headline}</a></h2>
                  <p>{article.snippet}</p>
                  <p>Published: {article.pub_date}</p>
                  <p>_id: {article._id}</p>
                </div>
                <div className="col-md-2">
                  <button onClick={this.handleClick.bind(this, article)} className="btn btn-danger" style={{marginLeft: 25 + '%', marginTop: 25 + '%'}}>
                    Delete
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
module.exports = Saved;
                 
                  