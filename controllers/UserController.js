var express = require('express');
var router = express.Router();
var auth = require('../auth/Authenticator');
var User = require('../models/User');
var firebaseDatabase = require('../auth/FirebaseAuth');

var DUP_CREATION_REQ = 11000;

// routes
router.post('/', auth, create);
router.get('/users', get);

module.exports = router;

function create(req, res) {

    var token = req.header("auth-token");
    firebaseDatabase.getUserData(token, function (userData, error) {
        if (error) {
            res.status(400).send("Failed to login into User account");
            throw error;
        }
        var newUser = User({
            name: userData.displayName,
            email: userData.email,
            photoUrl: userData.photoURL,
            uid : userData.uid
        });

        newUser.save(function (err, user) {
            if (err) {
                console.log("Error while creating user : " + JSON.stringify(err));
                if (DUP_CREATION_REQ === err.code) {
                    res.status(409).send();
                } else {
                    res.status(400).send("Failed to create User");
                }
            } else {
                console.log("User creation success : " + user);
                res.status(201).send();
            }
        });
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
