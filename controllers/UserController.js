var express = require('express');
var router = express.Router();
var User = require('../models/User');

var DUP_CREATION_REQ = 11000;

// routes
router.post('/', create);

module.exports = router;
function create(req, res) {

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

/*var newUser = User({
 name: 'Peter Quill',
 username: 'starlord55',
 password: 'password',
 admin: true
 });*/
