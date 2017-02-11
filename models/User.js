var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    photoUrl : String,
    userType: String,
    age: Number,
    interests: [],
    created_at: Date,
    updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
