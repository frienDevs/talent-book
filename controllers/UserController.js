var express = require('express');
var router = express.Router();
var auth = require('../auth/Authenticator');
var User = require('../models/User');

var DUP_CREATION_REQ = 11000;

// routes
router.get('/', auth, create);
router.get('/users', get);

module.exports = router;

function create(req, res) {

    newUser.save(function(err) {

        console.log("err : " + JSON.stringify(err));
        if (err) {
            if (DUP_CREATION_REQ === err.code) {
                res.status(409).send();
            }
            throw err;
        }

        console.log('Failed to create User' + JSON.stringify(err));
        res.status(400).send("Failed to create User");
    });

};

function get(req, res) {
    console.log("in get");
    res.status(510).send();
}

/*var newUser = User({
 name: 'Peter Quill',
 username: 'starlord55',
 password: 'password',
 admin: true
 });*/
