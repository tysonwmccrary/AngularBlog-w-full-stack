var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');  //Call This before require api do to information needed before.
var api = require('./api');
var routing = require('./middleware/routing.mw.js');
var configurePassport = require('./config/passport.js');
var clientPath = path.join(__dirname, '../client');



var app = express();

app.use(express.static(clientPath));
app.use(cookieParser());  //Call This before configurePassport to collect the route history.
app.use(bodyParser.json());


configurePassport(app);
app.use('/api', api);




app.get('*', routing.stateRouting);
app.listen(3000);