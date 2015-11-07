/**
 *jslint undef: true
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./config/routes.js')(app);

app.listen(8080); //to port on which the express server listen