var Disqus = require('disqus');

var disqus = new Disqus({
    api_secret : 'FbOfbK0Xwz2lxSzS5afGcKfdsMNoQnqhlCMYMM7TAPyCh3IjiONpWDGVgWwhfeim',
    api_key : 'Y2ugL1dzPmVAA8nS7C4Swqf4AkD2ixsgXo8imS5MdpBnMDfBh8W9KTvVw8nHQnXM',
    access_token : 'b4efe91e3def4118aad5de5591418bce'
});

var disqusModule = {};
disqusModule.getPosts = function() {
    disqus.request('posts/list', {}, function(data) {
        console.log(data);
        if (data.error) {
        } else {
            console.log("Data : " + data);
        }
    });
};

//author_name : "knvarma37", author_email : "knvarma37@gmail.com", message : "Hello.! My first comment"
disqusModule.getPosts = function() {
    disqus.request('users/listPosts',{forum : 'frienDevs'}, function(data) {
        console.log(data);
        if (data.error) {
        } else {
            console.log("Data : " + data);
        }
    });
};

module.exports = disqusModule;
