var firebaseAuth = require('./FirebaseAuth');
var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());

var AUTH_TOKEN = "auth-token";

function isAuthenticated(req, res, next) {
    console.log("checking for auth");
    //var token = req.header(AUTH_TOKEN);
    var token = parseCookies(req)[AUTH_TOKEN];
    console.log('Cookies: ', token);
    firebaseAuth.authenticate(token, function(uid) {
        req.headers['uid'] = uid;
        next();
    }, function(error) {
        console.log("401");
        res.status(401).send();
    });
}

function parseCookies(request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

module.exports = isAuthenticated;
