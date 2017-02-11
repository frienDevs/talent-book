var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    uid: { type: String, required: true },
    type: { type: String, required: true },
    title: String,
    desc: String,
    url : { type: String, required: true },
    tags : [],
    postType: String,
    likes : Number,
    created_at: Date,
    updated_at: Date
});

postSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at) {
        this.created_at = currentDate;
    }

    next();
});

// the schema is useless so far
// we need to create a model using it
var Post = mongoose.model('Post', postSchema);

// make this available to our users in our Node applications
module.exports = Post;
