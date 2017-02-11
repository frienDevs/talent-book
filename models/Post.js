var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    title: String,
    desc: String,
    url : { type: String, required: true },
    created_at: Date,
    updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Post = mongoose.model('Post', postSchema);

// make this available to our users in our Node applications
module.exports = Post;
