// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("api/timestamp/:dateString?", function(req, res) {
  if (req.params.dateString) {
    let dateString = req.params.dateString;

    // If its in millisecond then convert it into intiger
    if (dateString.length > 10) { 
      dateString = Number(dateString);
    }

    const date = new Date(dateString);

    if (date.getTime()) { // If valid
      res.json({unix:date.getTime(),utc:date.toUTCString()});
    } else { // If not valid
      res.json({"error": "Invalid Date"});
    }

  } else {

    let date = new Date();
    res.json({unix:date.getTime(),utc:date.toUTCString()});
  }
}); 


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
