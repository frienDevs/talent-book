var Post = require('../models/Post');
var authUtils = {};

authUtils.isSameUser = function (req) {
    var id = req.params.uid;
    var uid = req.header('uid');
    return id === uid;
};

authUtils.authorizedToUpdatePost = function(req) {
    var postUid = req.body.uid;
    var uid = req.header('uid');

    return postUid === uid;
}

module.exports = authUtils;

