const cheerio =require("cheerio");
const request = require("request");
const express = require('express');
const router = express.Router();
// const db = require("");
const mongoose = require("mongoose");

const app = express();

const databaseUrl = "scraper";
const collections =["news"];

const PORT = 3000 || process.env.PORT;

// const db = mongoose(databaseUrl, collections);
// db.on("error", function(err){
// console.log("Databse error:", error);

// });

app.get("/", function(req,res){
res.send ("Yo Dawg");
});

app.get("/all" ,function(req,res){
db.scrapedData.find({}, function(error, found){
  if (error){
    console.log(error);
}
else{
res.json(found);
}
});
});
app.get("/scrape", function(req, res) {
  // Make a request for the news section of `ycombinator`
  request("https://news.ycombinator.com/", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    $(".title").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      var title = $(element).children("a").text();
      var link = $(element).children("a").attr("href");

      // If this found element had both a title and a link
      if (title && summary && link) {
        // Insert the data in the scrapedData db
        db.scrapedData.insert({
          Headline: title,
          Summary: summary,
          URL: link
        },
        function(err, inserted) {
          if (err) {
            // Log the error if one is encountered during the query
            console.log(err);
          }
          else {
            // Otherwise, log the inserted data
            console.log(inserted);
          }
        });
      }
    });
  });

  // Send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});





var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App on 3000!");
});

// request("https://www.bostonglobe.com/", function(error, response, html){

// const $ = cheerio.load(html);

// const results = [];

// $("h2.story-title").each(function(i, element) {

//     const Headline = $(element).text();
//     const Summary = $(element).children("a").text();
//     const URL = $(element).children().attr("href");
 
//     results.push({
//       title: Headline,
//       summary: Summary, 
//       link: URL
//     });

//   });
//   console.log(results);
// }
// )