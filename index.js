const express = require('express');
var bodyParser = require('body-parser');
const app = express()
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.post('/sheets', function(req, res){
	console.log(req.body)
	  var name = req.body.name;
	  console.log(name);

	service.spreadsheets.values.get({
	   spreadsheetId: "1of1lh6QhlqI_xEHlWyqb9CUagpYv1_6IDnTPPikjFL4",
	   range: A
	}, function(err, result) {
	  if(err) {
	    // Handle error
	    console.log(err);
	  } else {
	    var numRows = result.values ? result.values.length : 0;
	    console.log('%d rows retrieved.', numRows);
	  }
	});

	  res.send("ok")


})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})