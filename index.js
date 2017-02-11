var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/talent-book');

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use('/api/users', require('./controllers/UserController'));

app.listen(3000, function () {
    console.log('Talent-Book is listening on port 3000!');
});

//var userCtrl = require('./controllers/UserController');
//userCtrl.post({}, {});
//userCtrl.post({}, {});

var User = require('./models/User');
var Auth = require('./app/auth/Authentication');

function create(req, res) {
    var newUser = User({
        name: 'Peter Quill',
        username: 'starlord55',
        password: 'password',
        admin: true
    });

    newUser.save(function(err) {

        console.log("err : " + JSON.stringify(err));
        if (err) {
            if (DUP_CREATION_REQ === err.code) {
                res.status(409);
            }
            throw err;
        }

        console.log('Failed to create User' + JSON.stringify(err));
        res.status(400).send("Failed to create User");
    });
    console.log("Successfully created user");
};
