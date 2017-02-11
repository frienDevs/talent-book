var admin = require("firebase-admin");
var serviceAccount = require("../sowmya-firebase-cred.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://talent-book.firebaseio.com"
});

var AuthService = {};
AuthService.authenticate = function(token, success, failed) {
    console.log("Auth token : " + token);
    admin.auth().verifyIdToken(token)
        .then(function(decodedToken) {
            success(decodedToken.uid);
        }).catch(function(error) {
            failed(error);
        });
};

AuthService.getUserData = function(token, callback) {
    AuthService.authenticate(token, function(uid) {
            admin.auth().getUser(uid)
                .then(function(userRecord) {
                    // See the UserRecord reference doc for the contents of userRecord.
                    console.log("Successfully fetched user data:", userRecord.toJSON());
                    callback(userRecord, null);
                })
                .catch(function(error) {
                    console.log("Error fetching user data:", error);
                    callback(null, error);
                });
    },
    function(error) {
        console.log("Error fetching user data:", error);
        callback(null, error);
    });

};

module.exports = AuthService;
