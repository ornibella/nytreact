var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var Article = require("./models/article");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));


// MongoDB Configuration
mongoose.connect("mongodb://localhost/nytreact");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});


app.get("/api", function(req, res) {


  Article.find({}).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// POST requests
app.post("/api", function(req, res) {

  var newArticle = new Article({
    main_headline: req.body.headline,
    web_url: req.body.url,
    snippet: req.body.snippet,
    pub_date: req.body.date,
    date: Date.now()
  });

  console.log("newArticle: ", newArticle);


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



// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});