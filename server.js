// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Article Schema
var Article = require("./models/article");

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/nytimes");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
app.get("/api", function(req, res) {

  // We will find all the saved articles in MongoDB
  Article.find({}).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// This is the route we will send POST requests to save each search.
app.post("/api", function(req, res) {

  var newArticle = new Article({
    main_headline: req.body.headline,
    web_url: req.body.url,
    snippet: req.body.snippet,
    pub_date: req.body.date,
    date: Date.now()
  });

  console.log("newArticle: ", newArticle);

  // Here we'll save the article based on the JSON input.
  // We'll use Date.now() to always get the current date time
  newArticle.save(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc._id);
    }
  });
});


app.delete("/api", function(req, res) {

   
   var id = req.query._id;
   console.log("this is req.query._id", id);

  Article.remove({ _id: id }, function(err) {
        if (!err) {
                console.log("Article deleted!");
        }
        else {
                console.loge(err);
        }
    });
});



// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
