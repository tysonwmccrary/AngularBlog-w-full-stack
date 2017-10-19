var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var configurePassport = require('./config/passport')
var api = require('./api');

var app = express();

var clientPath = path.join(__dirname, '../client');

app.use(express.static(clientPath));
app.use(bodyParser.json());





app.listen(3000);