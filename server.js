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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// Timestap microservice
app.get("/api/:date?", (req, res) => {
  /*const dateString = req.params.date;
  if (dateString == undefined) {
    const dateU = Date.now()
    const date = new Date(dateU);
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const ndate = date.getDate();
    const hours = (date.getHours()<10?'0':'') + date.getHours();
    const minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
    const seconds = (date.getSeconds()<10?'0':'') + date.getSeconds();
    res.json({"unix": dateU, "utc": `${day}, ${ndate} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`});
  } else if (dateString.length < 12) {
    var dateU = Date.parse(dateString);
    const date = new Date(dateU);
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const ndate = date.getDate();
    res.json({"unix": dateU, "utc": `${day}, ${ndate} ${month} ${year} 00:00:00 GMT`});
  } else if (dateString.length != 0) {
    const date = new Date(parseInt(dateString));
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const ndate = date.getDate();
    const hours = (date.getHours()<10?'0':'') + date.getHours();
    const minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
    const seconds = (date.getSeconds()<10?'0':'') + date.getSeconds();
    res.json({"unix": parseInt(dateString), "utc": `${day}, ${ndate} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`});
  }*/
  const gdate = req.params.date;
  let date;

  if (!gdate) {
    date = new Date();
  } else {
    const check = gdate * 1;
    date = isNaN(check) ? new Date(gdate) : new Date(check);
  }

  if (date == "Invalid Date") {
    res.json({error: "Invalid Date"});
  } else {
    const unix = date.getTime();
    const utc = date.toUTCString();
    res.json({ unix, utc });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
