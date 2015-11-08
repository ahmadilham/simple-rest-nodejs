/**
 *jslint undef: true
 */
var express = require('express')
 , bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8085;

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

app.listen(port, function() {
    console.log('App is running on http://localhost:' + port);
});