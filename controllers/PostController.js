var express = require('express');
var router = express.Router();
var auth = require('../auth/Authenticator');
var User = require('../models/User');
var Post = require('../models/Post');
var authUtils = require('../utils/AuthUtils');

// routes
router.post('/', auth, create);
router.get('/', get);
router.get('/user/:uid', getByUser);
router.get('/recommended/users/:uid', auth, postsForYou);
router.get('/trending', trending);
router.get('/latest', latest);

module.exports = router;

function create(req, res) {
    var post = req.body;

    User.findOne( {uid : post.uid.toString()}, function(err, user) {
        if (!user) {
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

function postsForYou(req, res) {
    if (authUtils.isSameUser(req)) {

        User.findOne({uid : req.params.uid}, function(err, user) {
            Post.find({tags : 'singers'}).sort({likes: 1})
                .exec(function(posts) {
                    console.log("Aggregate posts : " + posts);
                    res.send(posts);
                });
        });

    } else {
        res.status(400).send("Invalid user uid " + req.params.uid);
    }

}

function trending(req, res) {
    Post.find({}).sort({likes : -1, updated_at : -1}).exec(function(err, posts) {
        console.log("Trending posts : " + posts);
        res.send(posts);
    });
}

function latest(req, res) {
    Post.find({}).sort({updated_at : -1, likes : -1}).exec(function(err, posts) {
        console.log("Latest posts : " + posts);
        res.send(posts);
    });
}
