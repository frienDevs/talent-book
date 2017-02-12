var express = require('express');
var router = express.Router();
var auth = require('../auth/Authenticator');
var User = require('../models/User');
var Post = require('../models/Post');
var authUtils = require('../utils/AuthUtils');

// routes
router.get('/user/:uid', getByUser);
router.get('/recommended/users/:uid', auth, postsForYou);
router.get('/trending', trending);
router.get('/latest', latest);
router.post('/:id/like', auth, likeAPost);
router.post('/', auth, create);
router.get('/', get);
router.get('/:id', getPost);

module.exports = router;

function create(req, res) {
    var post = req.body;

    User.findOne( {uid : post.uid.toString()}, function(err, user) {
        if (!user) {
            res.status(400).send("Invalid user uid to create post");
        } else {
            var newPost = Post(post);
            newPost.likes = newPost.likes || [];
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

            Post.find({tags : {$in : [user.interests]}})
                .sort({likes : -1, updated_at : -1})
                .exec(function(err, posts) {
                    console.log("Trending posts : " + posts);
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

function likeAPost(req, res) {
    Post.findOne({'_id' : req.params.id}, function(err, post) {
        var uid = req.header('uid');
        console.log(" uid : " + uid);
        console.log(" post : " + post);

        if (post) {
            post.likes = post.likes || [];

            for (var key in post.likes) {
                if (post.likes[key] === uid) {
                    res.status(200).send("You have already liked it");
                    console.log("You have already liked it");
                    return;
                }
            }

            Post.findOneAndUpdate({"_id": post._id}, {$push: {"likes": uid}}, function (err, post) {
                post.likes.push(uid);
                res.send(post);
            });
        }
    });
}

function getPost(req, res) {
    Post.findOne({'_id' : req.params.id}, function(err, post) {
        if (post) {
            res.send(post);
        } else {
            res.status(400).send("Failed to like the post" + req.params.uid);
        }
    });
};

