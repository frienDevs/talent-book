var firebaseAuth = require('./FirebaseAuth');

var AUTH_TOKEN = "auth-token";

function isAuthenticated(req, res, next) {
    console.log("checking for auth");
    var token = req.header(AUTH_TOKEN);
    firebaseAuth.authenticate(token, function(uid) {
        console.log("authenticated : " + uid);
        next();
    }, function(error) {
        console.log("401");
        res.status(401).send();
    });
}

module.exports = isAuthenticated;
