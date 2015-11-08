/**
 *jslint undef: true
 */
var express = require('express')
 , bodyParser = require('body-parser');
var app = express();

app.set('views', './app/views');
app.set('view engine', 'jade');

app.use(express.static('./app/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./config/routes.js')(app);

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
});

app.get('/api', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
});

app.listen(8085); //to port on which the express server listen