var express = require('express');
var router = express.Router();
var auth = require('../auth/Authenticator');
var User = require('../models/User');
var firebaseDatabase = require('../auth/FirebaseAuth');
var authUtils = require('../utils/AuthUtils');

// routes
router.post('/', auth, create);
router.put('/:uid', auth, update);
router.get('/:uid', getUserDetails);
router.get('/', get);

module.exports = router;

function create(req, res) {

    var token = parseCookies(req)["auth-token"];
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

        User.findOne( {uid : newUser.uid.toString()}, function(err, user) {

            if (user) {
                console.log(" user Body : " + JSON.stringify(user));
                res.status(200).send(user);
            } else {

                console.log("newUser : " + newUser);

                newUser.save(function (err, user) {
                    if (err) {
                        console.log("Error while creating user : " + JSON.stringify(err));
                        res.status(400).send("Failed to create User");
                    } else {
                        console.log("User creation success : " + user);
                        res.status(201).send(user);
                    }
                });
            }

        });

    });
};

function update(req, res) {
    if (authUtils.isSameUser(req)) {
        var query = {'uid' : req.params.uid};
        User.findOneAndUpdate(query, req.body, {upsert:true}, function(err, doc) {
            if (err) return res.send(400, { error: err });
            return res.status(200).send(req.body);
        });
    } else {
        res.status(403).send();
    }
}

function get(req, res) {
    User.find().exec(function (err, users) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(users);
        }
    });
}

function parseCookies(request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function (cookie) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

function getUserDetails(req, res) {
    User.findOne({uid : req.params.uid}, function (err, user) {
        if (err) {
            res.status(404).send(err);
        } else {
            res.send(user);
        }
    });
}

