var React = require("react");


var Form = require("./children/Form");
var Results = require("./children/Results");
var Saved = require("./children/Saved");
var Promise = require("bluebird");


var helpers = require("./utils/helpers");

var Main = React.createClass({


  getInitialState: function() {
    return { 
      topic: "", 
      start: "", 
      end: "", 
      results: [], 
      savedArticles: [] 
    };
  },


  componentDidMount: function() {
    // Get the saved articles.
    helpers.getSaved().then(function(response) {
      console.log(response);
      if (response !== this.state.savedArticles) {
        console.log("Saved Articles", response.data);
        this.setState({ savedArticles: response.data });
      }
    }.bind(this));
  },


  componentDidUpdate: function() {
    console.log("componentDidUpdate!!");
    // article search query
    helpers.runQuery({
      topic: this.state.topic,
      start: this.state.start,
      end: this.state.end
    }).then(function(data) {
      if (data !== this.state.results) {
        console.log("Articles", data);
        this.setState({ results: data }); 
      }
    }.bind(this));
  },
  
  setTopic: function(topic) {
    this.setState({ topic: topic });
  },
  setStart: function(start) {
    this.setState({ start: start });
  },
  setEnd: function(end) {
    this.setState({ end: end });
  },
  setSavedArticles: function(saved) {
      this.setState({ savedArticles: saved });
    },


  render: function() {
    return (
      <div className="container">
        <div className="row">
        <div className="jumbotron">
            <h2 className="text-center">NYTimes Article Search using React!</h2>
            <p className="text-center">
              <em>Enter a search term and retun articles containing that topic.</em>
            </p>
          </div>

          <div className="col-md-12">
            <Form setTopic={this.setTopic} setStart={this.setStart} setEnd={this.setEnd}/>
          </div>

          <div className="col-md-12">
            <Results results={this.state.results} setSavedArticles={this.setSavedArticles}/>
          </div>

        </div>

        <div className="row">
          <Saved savedArticles={this.state.savedArticles} setSavedArticles={this.setSavedArticles}/>
        </div>  
      </div>
    );
  }
});


module.exports = Main;
