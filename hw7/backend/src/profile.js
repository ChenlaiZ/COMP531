'use strict'
// this is profile.js which contains all user profile 
// information except passwords which is in auth.js
const uploadImage = require('./uploadCloudinary')
const Profile = require('./model.js').Profile

const getHeadlines = (req, res) => {
    const users = req.params.users ? req.params.users.split(',') : [req.username]
    Profile.find({username: {$in: users}}).exec(function(err, profiles){
    	if(profiles === null || profiles.length === 0) {
    		res.status(400).send('Get headlines error')
    	}
    	var headlines = []
    	profiles.forEach(profile => {
    		headlines.push({username: profile.username, headline: profile.headline})
    	})
    	res.status(200).send({headlines: headlines})
    })
}

const putHeadline = (req, res) => {
	const username = req.username
	const headline = req.body.headline
	if(!headline) {
		res.status(400).send('Please enter your new headline')
	}
	Profile.update({username: username}, { $set: {headline: headline}}, {new: true}, function(err, profile){
		if(err) throw err
		else {
			res.status(200).send({username:username, headline:headline})
		}
	})
}

const getDob = (req, res) =>{
	const username = req.username
	Profile.find({username:username}).exec(function(err, profile){
		if(err) throw err
		else {
			const profileObj = profile[0]
			res.status(200).send({username:username, dob:profileObj.dob})			
		}
	})
}

const getEmails = (req, res) => {
	const username = req.params.user ? req.params.user : req.username
	Profile.find({username:username}).exec(function(err, profile){
		if(profile === null || profile.length === 0){
			res.status(400).send("no user "+username+" in database")
            return
		} else {
			const profileObj = profile[0]
			res.status(200).send({username:username, email:profileObj.email})			
		}
	})
}

const putEmail = (req, res) => {
	const username = req.username
	const email = req.body.email
	if(!email) {
		res.status(400).send('Please enter your new email')
	}
	Profile.update({username: username}, { $set: {email: email}}, {new: true}, function(err, profile){
		if(err) throw err
		else {
			res.status(200).send({username:username, email:email})
		}
	})
}

const getZipcodes = (req, res) => {
	const username = req.params.user ? req.params.user : req.username
	Profile.find({username:username}).exec(function(err, profile){
		if(profile === null || profile.length === 0){
			res.status(400).send("no user "+username+" in database")
            return
		} else {
			const profileObj = profile[0]
			res.status(200).send({username:username, zipcode:profileObj.zipcode})			
		}
	})
}

const putZipcode = (req, res) => {
	const username = req.username
	const zipcode = req.body.zipcode
	if(!zipcode) {
		res.status(400).send('Please enter your new zipcode')
	}
	Profile.update({username: username}, { $set: {zipcode: zipcode}}, {new: true}, function(err, profile){
		if(err) throw err
		else {
			res.status(200).send({username:username, zipcode:zipcode})
		}
	})
}

const getAvatars = (req, res) => {
    const users = req.params.user ? req.params.user.split(',') : [req.username]
    Profile.find({username: {$in: users}}).exec(function(err, profiles){
    	if(profiles === null || profiles.length === 0) {
    		res.status(400).send("no user "+username+" in database")
    		return
    	}
    	var avatars = []
    	profiles.forEach(profile => {
    		avatars.push({username: profile.username, avatar: profile.avatar})
    	})
    	res.status(200).send({avatars:avatars})
    })
}

const putAvatar = (req, res) => {
	const username = req.username
	const avatar = req.fileurl
	if(!avatar) {
		res.status(400).send('Please upload your new avatar')
	}
	Profile.update({username: username}, { $set: {avatar: avatar}}, {new: true}, function(err, profile){
		if(err) throw err
		else {
			res.status(200).send({username:username, avatar:avatar})
		}
	})
}

module.exports = (app) => {
    app.get('/headlines/:users?', getHeadlines)
    app.put('/headline', putHeadline)
    app.get('/dob',getDob)
	app.get('/email/:user?', getEmails)
	app.put('/email', putEmail)
	app.get('/zipcode/:user?', getZipcodes)
	app.put('/zipcode', putZipcode)
	app.get('/avatars/:user?', getAvatars)
	app.put('/avatar', uploadImage('avatar'), putAvatar)    
} 