var express = require('express');
var router = express.Router();
var auth = require('../auth/Authenticator');
var Post = require('../models/Post');

// routes
router.post('/', /*auth,*/ create); // TODO
router.get('/', get);
router.get('/user/:uid', getByUser);

module.exports = router;

function create(req, res) {
    var post = req.body;
    User.findOne( {uid : post.uid}, function(err, user){
        if (err) {
            res.status(400).send("Invalid user uid to create post");
        } else {
            var newPost = Post(post);
            newPost.save(function (err, post) {
                if (err) {
                    console.log("Error while creating post : " + JSON.stringify(err));
                    res.status(400).send("Failed to create post");

                } else {
                    console.log("Post creation success : " + post);
                    res.status(201).send();
                }
            });
        }
    });
}

function get(req, res) {
    Post.find().exec(function (err, posts) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(posts);
        }
    });
}

function getByUser(req, res) {
    Post.find( {uid : req.params.uid }, function(err, posts) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(posts);
        }
    });
}
