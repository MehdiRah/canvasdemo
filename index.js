var express = require('express'),
    stylus = require('stylus'), 
    nib = require('nib'),
    oauth2 = require('salesforce-oauth2');

var callbackUrl = "https://mehdirahcanvasdemo.herokuapp.com/callback",
    consumerKey = "3MVG9A_f29uWoVQv37e8wuVT0KfIksy7Y6HhQjdbxzJM9GMzV3YDPDs.y_ZHlKBU.TMbNvXyNQEne.mFzry7P",
    consumerSecret = "1463378115517446037";

var app = express();

app.set('port', (process.env.PORT || 5000));

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
};

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
// app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public/stylesheets'
  , compile: compile
  }
));

app.use(express.static(__dirname + '/public'))

// app.get('/', function (req, res) {
//   res.render('index',
//   { title : 'Home' }
//   )
// });

console.log('<Mehdi>: pre OAuth stuff');

app.get("/", function(request, response) {
    var uri = oauth2.getAuthorizationUrl({
        redirect_uri: callbackUrl,
        client_id: consumerKey,
        scope: 'full'
    });

    console.log('<Mehdi>:Init Resp: ' + response);

    return response.redirect(uri);
});

console.log('<Mehdi>: pre callback');

app.get('/callback', function(request, response) {
    var authorizationCode = request.param('code');
    var oPayload;
    oauth2.authenticate({
        redirect_uri: callbackUrl,
        client_id: consumerKey,
        client_secret: consumerSecret,
        code: authorizationCode
    }, function(error, payload) {
        /*

        The payload should contain the following fields:

        id                 A URL, representing the authenticated user,
                        which can be used to access the Identity Service.

        issued_at        The time of token issue, represented as the 
                        number of seconds since the Unix epoch
                        (00:00:00 UTC on 1 January 1970).

        refresh_token    A long-lived token that may be used to obtain
                        a fresh access token on expiry of the access 
                        token in this response. 

        instance_url    Identifies the Salesforce instance to which API
                        calls should be sent.

        access_token    The short-lived access token.


        The signature field will be verified automatically and can be ignored.

        At this point, the client application can use the access token to authorize requests 
        against the resource server (the Force.com instance specified by the instance URL) 
        via the REST APIs, providing the access token as an HTTP header in 
        each request:

        Authorization: OAuth 00D50000000IZ3Z!AQ0AQDpEDKYsn7ioKug2aSmgCjgrPjG...

        Note: Instance ID something like this: '_CanvasDemo'
        Breakdown: Instance ID Breakdown: '_<ApplicationName>:<Id>'
        */


        console.log( '<Mehdi>:Payload  ' + JSON.stringify(payload));
        console.log( '<Mehdi>:error  ' + JSON.stringify(error));
        sPayload = JSON.stringify(payload);
    });
    var aoPageData = {
        'pageData':[
            {   title   : 'Home'    },
            {   'okeys' : oPayload  }
        ]
    }
    return response.render('index',{ title   : 'Home', conns : sPayload }); 
});




app.listen(app.get('port'), function() {
  console.log("<Mehdi> log: " + app.get('port'))
})
