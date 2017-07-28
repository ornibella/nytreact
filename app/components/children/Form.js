var React = require("react");

// Form component
var Form = React.createClass({


  getInitialState: function() {
    return { 
      topic: "",
      start: "",
      end: ""
     };
  },

  handleTopicChange: function(event) {
    console.log(event);
    this.setState({ topic: event.target.value });
  },

  handleStartChange: function(event) {
    console.log(event);
    this.setState({ start: event.target.value });
  },


  handleEndChange: function(event) {
    console.log(event);
    this.setState({ end: event.target.value });
  },

  handleSubmit: function(event) {
    event.preventDefault();

    // Set the parent state with the form props
    this.props.setTopic(this.state.topic);
    this.props.setStart(this.state.start);
    this.props.setEnd(this.state.end);
    console.log("handleSubmit triggered: ", this.state.topic);
    
    //Clears  form
    this.setState({ 
      topic: "",
      start: "",
      end: "" 
    });
  },


  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h2 className="panel-title text-center" style={{fontSize: 30px, fontWeight: 'bold', color: 'blue'}}>Article Search</h2>
        </div>
        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h4 className="">
                <strong>Topic</strong>
              </h4>
              {}
              <input
                value={this.state.topic}
                type="text"
                className="form-control text-center"
                id="topic"
                onChange={this.handleTopicChange}
                required
              />
              <h4 className="">
                <strong>Start Year</strong>
              </h4>
              <input
                value={this.state.start}
                type="text"
                className="form-control text-center"
                id="start"
                onChange={this.handleStartChange}
              />
              <h4 className="">
                <strong>End Year</strong>
              </h4>
              <input
                value={this.state.end}
                type="text"
                className="form-control text-center"
                id="end"
                onChange={this.handleEndChange}
              />
              <br />
              <button
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Form;
