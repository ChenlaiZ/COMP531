'use strict';

const Article = require('./model.js').Article
const Comment = require('./model.js').Comment
const Profile = require('./model.js').Profile
const md5 = require('md5')
const uploadTextAndImage = require('./uploadCloudinary')

const addArticle = (req, res) => {
	if(!req.textMsg && !req.fileurl) {
		res.status(400).send('Add articles error')
		return
	}
	const articleObj = new Article({author: req.username, img:req.fileurl, date: new Date(), text:req.textMsg, comments: []})
	new Article(articleObj).save(function(err, article){
		if(err) throw err
		else {
			res.status(200).send({articles: [article]})
		}
	})
}

const getArticles = (req, res) => {
	if(req.params.id){
		Article.find({_id:req.params.id}).exec(function(err, article){
			if(article === null || article.length === 0) {
				res.status(401).send('Get articles error')
				return
			}
			const articleObj = article[0]
			res.status(200).send({articles: articleObj})
		})
	} else {
        Profile.find({username: req.username}).exec(function(err, profile){
            const userObj = profile[0]
            const usersToQuery = [req.username, ...userObj.following]
            Article.find({author: {$in: usersToQuery}}).sort('-date').limit(10).exec(function(err, articles){
                res.status(200).send({articles: articles})
            })
        })
	}
}

const putArticle = (req, res) => {
	if(!req.params.id) {
		res.status(400).send('Put articles error: no id')
		return		
	}
	Article.find({_id:req.params.id}).exec(function(err, article){
		if(article === null || article.length === 0) {
			res.status(401).send('Put articles error: no specified article')
			return
		}
		if(req.body.commentId === "-1") {
			const commentId = md5(req.username + new Date().getTime())
			const commentObj = new Comment({commentId: commentId, author: req.username, date: new Date(), text: req.body.text})
			new Comment(commentObj).save(function(err, comment){
				if(err) throw err
			})
			Article.findByIdAndUpdate(req.params.id, {$addToSet: {comments:commentObj}}, {upsert:true, new:true}, function(err, article){})
			Article.find({_id:req.params.id}).exec(function(err, article){
				res.status(200).send({articles: article})
			})
		} else if(req.body.commentId) {
			Comment.find({commentId: req.body.commentId}).exec(function(err, comments){
				if(comments === null || comments.length === 0) {
					res.status(401).send('Put articles error: no specified comment')
					return
				}
				if(comments[0].author === req.username) {
					Comment.update({commentId: req.body.commentId}, { $set: {text:req.body.text}}, {new:true}, function(err, comments){})
					Article.update({_id:req.params.id, 'comments.commentId':req.body.commentId}, {$set:{'comments.$.text':req.body.text}}, {new: true}, function(err, articles){})
                    Article.find({_id:req.params.id}).exec(function(err, article){
                        res.status(200).send({articles: article})
                    })					
				}
			})
		} else {
			if(article[0].author === req.username) {
				Article.findByIdAndUpdate(req.params.id, {$set: {text:req.body.text}}, {new: true}, function(err, article){
					res.status(200).send({articles: article})
				})
			}
		}
	})
}

module.exports = (app) => {
	app.get('/articles/:id*?', getArticles)
	app.post('/article', uploadTextAndImage('img'), addArticle)  
	app.put('/articles/:id', putArticle)
} 