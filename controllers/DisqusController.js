var express = require('express');
var router = express.Router();
var auth = require('../auth/Authenticator');

// routes
router.post('/', /*auth,*/ create);
router.get('/', /*auth,*/ get);

module.exports = router;

function create(req, res) {
    console.log("POST Disqus req : " + JSON.stringify(req));
};

function get(req, res) {
    console.log("GET Disqus req : " + JSON.stringify(req));
};
