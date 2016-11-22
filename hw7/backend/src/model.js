'use strict'
// this is model.js 
var mongoose = require('mongoose')
require('./db.js')

var commentSchema = new mongoose.Schema({
	commentId: String, author: String, date: Date, text: String
})

var articleSchema = new mongoose.Schema({
	id: String, author: String, img: String, date: Date, text: String,
	comments: [ commentSchema ]
})

var profileSchema = new mongoose.Schema({
	username: String, dob: Number, email: String, zipcode: String, avatar: String,
	headline: String, following: [ String ]
})

var userSchema = new mongoose.Schema({
	username: String, salt: String, hash: String
})

exports.Comment = mongoose.model('comment', commentSchema)
exports.Article = mongoose.model('article', articleSchema)
exports.Profile = mongoose.model('profile', profileSchema)
exports.User = mongoose.model('user', userSchema)

