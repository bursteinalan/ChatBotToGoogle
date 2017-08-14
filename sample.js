var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
    var clientSecret = "oegYbgZqNLIDR8I8am1gL9op";
    var clientId = "119758712394-oncbrokug93u12gt5igbaqqlsjpkqak2.apps.googleusercontent.com";
    var redirectUrl = "urn:ietf:wg:oauth:2.0:oob";
var clientIdAdmin = "113773516317606772077"

// {
//   "type": "service_account",
//   "project_id": "uplifted-gadget-176621",
//   "private_key_id": "d7c65cf43d50ace1ef896eff99516eb76fc927e1",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDevpoQGmzngHem\nhLa8Rx8yPL7fY65cd29BXHbrVL3lT8kMDvAknixfm+JoC7jgyJY47YokrGmF7ij2\n3FIWQKR98f9cPYQrVGb7APpc/MSpItvKgLDxWD0plOBYmMa0tziqNetS3zPP4vn5\nAla/j7OqHOhsqpNk+1ji/xKX5Gs6AG3Vuf8LZh83+oithpZfqMkZNwZ/JtFQOAOk\nbfAMCSGqXxdRyyHhs98L/0iWE44TUTgPNKeq6IuwoZoY75JwCvdsaV3yDyzup54x\nxJZy6ZhBNYTyhXFlnNZzfUiSOYZc97QtoEZ9dQ1mqvNC9DlLqaB4xbcK+LuT3APK\nU4zvJdgVAgMBAAECggEAZ8m2LbSyc/hHSD7kirw1DAqEAcEHuKwqGfGEs8jLpvLT\nQhwfx2AwWuheyY5UueCdJq+AQ/BWRwKe8c/dK+M5Ajple0xqrmnohiKBhhx9YjYM\n5cGrMPmlnh9xnbaqOAB7lcwD95xrHv2q7l0poJ7L34MSxbeBcHcxhqvFtSLI18AG\nmLfpmx/8v67SJnbJ+rjDmMydCn+zHpnnBaCwfgHnkisF54TL8GEmyWS0Md8Z3vwA\nv7Pk5hM3C6NxKVqhJ0bSSugnyFEXiAKXmSuvQTsdfeIHDayhPAmXVrKkNNBtQPq7\ni8K3Wm39LeUFmCKMdqmzQE8pZxwqSmfsbkR78hi6LQKBgQD7biCOu1rFRA4UXezR\nJLHbFL9BBtsah6aHtqo7UleqlyE6sHJx5Q98o1KWJp+sTYLedPvxfAgylZzyP3aa\nSmB3uBwwhzmsamWVVXj75G2p4nxklp+WZUTTBEZnFblXV4WgusFS1yGIaQpaTK8T\ntVbWXUoCvz8NOkQ1h8/sgLi+0wKBgQDiywEC5vrt+qJFrCK/2A+VEPLjsvSoKz0+\nZkSfd8n7Ony1647DnFNxSN1F7QPMut3vztio0gfZWqSkypPEMmARP6LXHa8Mmar0\nXYvXWCpwjcp2qtIWpq+oSgBOdw3+mr5RQ0kGO/TXk0ipSGzLcKoTq6WbNfUj52Cj\nAkhBKtfMdwKBgCwanUtsQffogC/CahAlx60Obp4Rfc2hjeywdhwBza7247VPzkN8\nUsMiQxJjpA6tag9rpeYuQ6Hb7LPxvfRCp7lYall43v0HjNotLBPDdhkeyYM7iLLx\nAKmjTlY20VQo3h/bop3NbuxmwJImcW+bl6fypVDmC0FevyhEsoxh6AZRAoGAW4xk\n2R4SVvRggs1srZJzH9Jaqc24cxYZP9Iai2DYmOBQLUNsOswk5srp/2sgqIkaQ850\nqRk3b+bmJVtc8MsA+pV8j2d9HRH+72u/omsFnq+t9d8YtWoN6FoO652leYxPnRAT\nL0AOouLiZutEd48AKLaWQCQ004x39vVZ42x+9hsCgYAX49qZdQC6IY7Xh0SJ3QP3\nMKfLEIPWPnQkW2U3pOgI5dXDTsJ2NNROGPk6Nstl7DA5HDmbg8LsJ7T7hfe8Z92G\nRsmbK0Hm/3fKEDvmdfS1hwH/5y7TUFjOsMOV9rnLVMAxq9pq++RQYQXr57yhAgjj\nhxk75jmn20rImv7tPZgSZQ==\n-----END PRIVATE KEY-----\n",
//   "client_email": "google-update@uplifted-gadget-176621.iam.gserviceaccount.com",
//   "client_id": "113773516317606772077",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://accounts.google.com/o/oauth2/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/google-update%40uplifted-gadget-176621.iam.gserviceaccount.com"
// }



const express = require('express');
var bodyParser = require('body-parser');
const app = express()
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use( bodyParser.urlencoded({ extended: false }))
// // parse some custom thing into a Buffer 
// app.use(bodyParser.raw())
app.use(bodyParser.urlencoded({
    extended: true
}));
// parse an HTML body into a string 
// app.use(bodyParser.text())

app.get('/', function (req, res) {
  console.log("** Received GET, responding with Hello World")
  var jsonResponse = [];
    jsonResponse.push({ "text": "Hi. Hello world" });
    res.send(jsonResponse);
})

app.post('/sheets', function(req, res){
  req.setEncoding('utf8');
    var name = req.body.name;
    var firstName = req.body['first name']
    var lastName = req.body['last name']
    
    console.log("first name: ", firstName)
    console.log("last name: ", lastName)
    name=firstName+" "+lastName
    console.log("** Received request for: ",name);

   var auth = new googleAuth();
   var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

   var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
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
    messages.push({"text":"Hi "+name+", lets check your score"})
    messages.push({"text":"Your have: "+final})
    output={"messages":messages}
    res.send(output)
    console.log(results)
  }
  

  authorize("",runGoogle, printlog);
})

app.post('/updateSheet', function(req, res){
req.setEncoding('utf8');
    var name = req.body.name;    
    // console.log("first name: ", firstName)
    // console.log("last name: ", lastName)
    // name=firstName+" "+lastName
    console.log("** Received request for: ",name);

   var auth = new googleAuth();
   var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

   var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
   var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
      process.env.USERPROFILE) + '/.credentials/';
   var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json';

   var printSuccess = function(results){
    var output = {}
   var messages=[]
    messages.push({"text":"Hi "+name})
    messages.push({"text":"Tried sending response: "+results})
    output={"messages":messages}
    res.send(output)
    console.log(results)
  }
  

  authorize("",updateGoogle, printSuccess);
  })

function updateGoogle(auth, callback){
    console.log("sending data")
  var sheets = google.sheets('v4');
  var body = {
    "range": "Sheet1",
    majorDimension: "ROWS",
    "values": [
        ["Justin Lee", "90%"]
    ]
}
  sheets.spreadsheets.values.append({
    auth: auth,
  spreadsheetId: '1mnYewufEMg2WCbXFSa_Jqwc4l3oiO_SyG8Q9WuDZoo4',
  range: 'Sheet1',
  valueInputOption: 'RAW',
  resource: body,
}, function (err, response) {
  if (err) {
      console.log('The API returned an error: ' + err);
      callback("failed");
    }
    console.log("Response: ",response)
  callback("success")

});
}


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
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json';

// authorize("", getGoogleData);


 // Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Sheets API.
  authorize(JSON.parse(content), getGoogleData);
});

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
       getNewToken(oauth2Client, callback);
      // token={"access_token":"ya29.GlulBBCxfEXMWIIfymO5R3zk1WMLlU8WiVnY2R5vL2VVTwJED-yhJN2unLY9HCelasa5bYsva0WALQPnDTplvopebFf3xrsWL1tYLr-fCfRCwq6VbnhobqMs2DlH","refresh_token":"1/8BiHRXOjImRP6cXEmG2pXAIw0Be50TeFOel3laA6OcE","token_type":"Bearer","expiry_date":1502577278805}
      oauth2Client.credentials = token;
      callback(oauth2Client, callback);
      // getNewToken(oauth2Client, callback);
    } else {

      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client, callback2);
    }
  });
}

/*
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



// var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
//     process.env.USERPROFILE) + '/.credentials/';
// var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json';

// // Load client secrets from a local file.
// fs.readFile('client_secret.json', function processClientSecrets(err, content) {
//   if (err) {
//     console.log('Error loading client secret file: ' + err);
//     return;
//   }
//   // Authorize a client with the loaded credentials, then call the
//   // Google Sheets API.
//   authorize(JSON.parse(content), listMajors);
// });

// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  *
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorize(credentials, callback) {
//   var clientSecret = credentials.installed.client_secret;
//   var clientId = credentials.installed.client_id;
//   var redirectUrl = credentials.installed.redirect_uris[0];
//   var auth = new googleAuth();
//   var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, function(err, token) {
//     if (err) {
//       getNewToken(oauth2Client, callback);
//     } else {
//       oauth2Client.credentials = JSON.parse(token);
//       callback(oauth2Client);
//     }
//   });
// }

// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  *
//  * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback to call with the authorized
//  *     client.
//  */
// function getNewToken(oauth2Client, callback) {
//   var authUrl = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES
//   });
//   console.log('Authorize this app by visiting this url: ', authUrl);
//   var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
//   rl.question('Enter the code from that page here: ', function(code) {
//     rl.close();
//     oauth2Client.getToken(code, function(err, token) {
//       if (err) {
//         console.log('Error while trying to retrieve access token', err);
//         return;
//       }
//       oauth2Client.credentials = token;
//       storeToken(token);
//       callback(oauth2Client);
//     });
//   });
// }

// /**
//  * Store token to disk be used in later program executions.
//  *
//  * @param {Object} token The token to store to disk.
//  */
// function storeToken(token) {
//   try {
//     fs.mkdirSync(TOKEN_DIR);
//   } catch (err) {
//     if (err.code != 'EEXIST') {
//       throw err;
//     }
//   }
//   fs.writeFile(TOKEN_PATH, JSON.stringify(token));
//   console.log('Token stored to ' + TOKEN_PATH);
// }

// /**
//  * Print the names and majors of students in a sample spreadsheet:
//  * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
//  */
// function listMajors(auth) {
//   var sheets = google.sheets('v4');
//   sheets.spreadsheets.values.get({
//     auth: auth,
//     spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
//     range: 'Class Data!A2:E',
//   }, function(err, response) {
//     if (err) {
//       console.log('The API returned an error: ' + err);
//       return;
//     }
//     var rows = response.values;
//     if (rows.length == 0) {
//       console.log('No data found.');
//     } else {
//       console.log('Name, Major:');
//       for (var i = 0; i < rows.length; i++) {
//         var row = rows[i];
//         // Print columns A and E, which correspond to indices 0 and 4.
//         console.log('%s, %s', row[0], row[4]);
//       }
//     }
//   });
// }