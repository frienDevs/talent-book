var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/app'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/talent-book');

//app.get('/', function (req, res) {
//    return res.sendfile('./app/index.html');
//});

app.use('/api/users', require('./controllers/UserController'));
app.use('/api/posts', require('./controllers/PostController'));
//app.use('/api/disqus/auth-callback', require('./controllers/DisqusController'));

app.get('*', function (req, res) {
    return res.sendfile('./app/index.html');
});

app.listen(3000, function () {
    console.log('Talent-Book is listening on port 3000!');
});


//var userCtrl = require('./controllers/UserController');
//userCtrl.post({}, {});
//userCtrl.post({}, {});
