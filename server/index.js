var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
//var configurePassport = require('./config/passport');
var api = require('./api');
var routing = require('./middleware/routing.mw.js');

var app = express();

var clientPath = path.join(__dirname, '../client');

app.use(express.static(clientPath));
app.use(bodyParser.json());

app.use('/api', api);




app.get('*', routing.stateRouting);
app.listen(3000);