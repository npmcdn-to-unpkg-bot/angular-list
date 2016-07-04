var domain = process.env.DOMAIN || '';
var port = process.env.PORT || 5000;
var express = require('express');
var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
app.use(express.static(__dirname + '/public'));

app.listen(port, function() {
  console.log("Listening on " + port);
});
