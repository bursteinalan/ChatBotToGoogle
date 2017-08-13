var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
    var clientSecret = "oegYbgZqNLIDR8I8am1gL9op";
    var clientId = "119758712394-oncbrokug93u12gt5igbaqqlsjpkqak2.apps.googleusercontent.com";
    var redirectUrl = "urn:ietf:wg:oauth:2.0:oob";

const express = require('express');
var bodyParser = require('body-parser');
const app = express()
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.get('/', function (req, res) {
  console.log("** Received GET, responding with Hello World")
  var jsonResponse = [];
    jsonResponse.push({ "text": "Hi. Hello world" });
    res.send(jsonResponse);
  // res.send({"text":'Hello World!'});
})

app.post('/sheets', function(req, res){
  console.log(req.body)
    var name = req.body.name;
    console.log("** Received request for: ",name);

   var auth = new googleAuth();
   var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

   var SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
   var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
      process.env.USERPROFILE) + '/.credentials/';
   var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json';

   var printlog = function(results){
    var final;
    console.log(results)
    for (var i = 0; i < results.length; i++) {
       var row = results[i];
      if (row[0]==name){
        console.log("found A")
        final=row[1];
      }
    }
   var output = {}
   var messages=[]
    messages.push({"text":"hi "+name})
    messages.push({"text":"Your points are: "+final})
    output={"messages":messages}
    res.send(output)
    console.log(results)
  }

  authorize("",runGoogle, printlog);
  // var results = authorize("",runGoogle(,printlog))
  // var results = runGoogle(authorize())
  //   console.log("results=",results)
  
  // authorize("", function(runGoogle,results){
  //   console.log(results)
  // })


    
    // var rows=getGoogleData();
  
    // res.send("ok")


})


//Get and return google data
function runGoogle(auth,callback){
  console.log("getting data")
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '1mnYewufEMg2WCbXFSa_Jqwc4l3oiO_SyG8Q9WuDZoo4',
    range: 'A:B',
  }, function(err, response) {
    console.log("got data")
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var rows = response.values;
    
    callback(rows);
  });
}

var port = process.env.PORT || 3000;
app.listen(port, function () {

   console.log("Started listening on %s", port);
})


// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json';

authorize("", getGoogleData);


// // Load client secrets from a local file.
// fs.readFile('client_secret.json', function processClientSecrets(err, content) {
//   if (err) {
//     console.log('Error loading client secret file: ' + err);
//     return;
//   }
//   // Authorize a client with the loaded credentials, then call the
//   // Google Sheets API.
//   authorize(JSON.parse(content), getGoogleData);
// });

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, callback2) {
  // var clientSecret = credentials.installed.client_secret;
  // var clientId = credentials.installed.client_id;
  // var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      token={"access_token":"ya29.GlulBBCxfEXMWIIfymO5R3zk1WMLlU8WiVnY2R5vL2VVTwJED-yhJN2unLY9HCelasa5bYsva0WALQPnDTplvopebFf3xrsWL1tYLr-fCfRCwq6VbnhobqMs2DlH","refresh_token":"1/8BiHRXOjImRP6cXEmG2pXAIw0Be50TeFOel3laA6OcE","token_type":"Bearer","expiry_date":1502577278805}
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client, callback2);
      // getNewToken(oauth2Client, callback);
    } else {

      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client, callback2);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function getGoogleData(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '1mnYewufEMg2WCbXFSa_Jqwc4l3oiO_SyG8Q9WuDZoo4',
    range: 'A:B',
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var rows = response.values;
    if (rows.length == 0) {
      console.log('No data found.');
    } else {
      console.log('Name, Major:');
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        // Print columns A and E, which correspond to indices 0 and 4.
        console.log('%s, %s', row[0], row[1]);
      }
    }
    return rows;
  });
}

