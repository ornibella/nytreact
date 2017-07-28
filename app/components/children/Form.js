// Include React
var React = require("react");

// Creating the Form component
var Form = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { 
      topic: "",
      start: "",
      end: ""
     };
  },

  // This function will respond to the user input
  handleTopicChange: function(event) {
    console.log(event);
    this.setState({ topic: event.target.value });
  },

  // This function will respond to the user input
  handleStartChange: function(event) {
    console.log(event);
    this.setState({ start: event.target.value });
  },

  // This function will respond to the user input
  handleEndChange: function(event) {
    console.log(event);
    this.setState({ end: event.target.value });
  },

  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    // Set the parent state with the form props
    this.props.setTopic(this.state.topic);
    this.props.setStart(this.state.start);
    this.props.setEnd(this.state.end);
    console.log("handleSubmit triggered: ", this.state.topic);
    //Clears input values in form
    this.setState({ 
      topic: "",
      start: "",
      end: "" 
    });
  },
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h2 className="panel-title text-center" style={{fontSize: 25 + 'px', fontWeight: 'bold', color: 'blue'}}>Article Search</h2>
        </div>
        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h4 className="">
                <strong>Topic</strong>
              </h4>
              {/*
                Note how each of the form elements has an id that matches the state.
                This is not necessary but it is convenient.
                Also note how each has an onChange event associated with our handleChange event.
              */}
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
