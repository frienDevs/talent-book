
var authUtils = {};

authUtils.isSameUser = function (req) {
    var id = req.params.uid;
    var uid = req.header('uid');
    return id === uid;
};

module.exports = authUtils;

