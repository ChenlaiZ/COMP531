'use strict'
const cookieKey = 'sid'

//const callbackURL = 'http://localhost:3000/auth/callback'
const callbackURL = 'https://stark-ridge-57925.herokuapp.com/auth/callback'
const clientSecret = "9d0cd69d1e8167e68307248e3e79b5e9"
const clientID = "661028574071891"
const config = {clientSecret, clientID, callbackURL}
const mySecretMessage = "cz32cz32cz32"
const md5 = require('md5')
const qs = require('querystring')
const express = require('express')
const request = require('request')
const passport = require('passport')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const User = require('./model.js').User
const Profile = require('./model.js').Profile
const Article = require('./model.js').Article
const Comment = require('./model.js').Comment
const FacebookStrategy = require('passport-facebook').Strategy
const redis = require('redis').createClient('redis://h:p82d0167e70e242c4b53b4712bf4b9c5e37740e79d34e2d5c3ca8fd1f873fe532@ec2-54-83-62-222.compute-1.amazonaws.com:10539')
let hostUrl = '';



passport.serializeUser(function(user, done){
	done(null, user.id)
})

passport.deserializeUser(function(id, done){
	User.findOne({auth_id: id}).exec(function(err, user) {
		done(null, user)
	})
})

passport.use(new FacebookStrategy(config,
	function(token, refreshToken, profile, done){
		const username = profile.displayName + "@fb.com"
		User.findOne({username: username}).exec(function(err, user) {
			if(!user || user.length === 0){
				const userObj = new User({username: username, auth_id: profile.id})
				new User(userObj).save(function (err, usr){
					if(err) return console.log(err)
				})
				const profileObj = new Profile({username: username, headline: "I am a fb user", following:[], email: null, zipcode: null, dob: new Date(1994,11,09).getTime(), avatar: null})
				new Profile(profileObj).save(function (err, usr){
					if(err) return console.log(err)
				})
			}
			return done(null, profile)
		})
	}
))

const isLoggedIn = (req, res, next)=> {
	if (req.isAuthenticated()) {
		const users = req.user.username.split('@');
		const authObj = {}
		authObj[`facebook`] = users[0]
		User.findOne({auth: authObj}).exec(function(err, user) {
			if(!user){
				req.username = req.user.username
			} else {
				req.username = user.username
			}
			next()
		})
	}
	else{
		var sid = req.cookies[cookieKey]
		if(!sid) {
			res.status(401).send('Is logged in errorrrr')
			return 
		} else {
			redis.hgetall(sid, function(err, userObj) {
				if(err) throw err;
				if(userObj) {
					console.log(sid + ' mapped to ' + userObj.username)
					req.username = userObj.username
					next()
				} else {
					res.redirect('./login')
				}
			})
		}
	}
}

const index = (req, res) => {
     res.send({ hello: 'world' })
}

function isAuthorized(req, obj) {
	var salt = obj.salt
	var pass = req.body.password
	var rehash = md5(pass + salt)
	return obj.hash === rehash
}

function login(req, res) {
	var username = req.body.username
	var password = req.body.password
	if(!username || !password) {
		res.status(400).send({result: 'should fill both username and password'})
		return
	}

	User.find({username: username}).exec(function(err, users){
		if(users === null || users.length === 0) {
			res.status(401).send({result: 'No matched username'})
			return
		}
		var userObj = users[0]
		if(isAuthorized(req, userObj)) {
			const sessionKey = md5(mySecretMessage + new Date().getTime() + userObj.username)
			redis.hmset(sessionKey, userObj)
			// cookie lasts for 1 hour
			res.cookie(cookieKey, sessionKey, 
				{MaxAge: 3600*1000, httpOnly: true })
			
			var msg = { username: username, result: 'success'}
			res.status(200).send(msg)
		} else {
			res.status(401).send({reuslt: 'Please enter correct password'})
			return
		}

	})
}

function register(req, res) {
	var username = req.body.username
	var email = req.body.email
	var dob = new Date(req.body.dob).getTime()
	var zipcode = req.body.zipcode
	var password = req.body.password

	if(!username || !dob || !zipcode || !email || !password){
		res.status(400).send({result: 'Should fill all the fields!'})
		return
	}

	User.find({username: username}).exec(function(err, users){
		if(users.length != 0) {
			res.status(401).send({result: 'The username already exists'})
			return
		}
		const salt = md5(username + new Date().getTime())
		const hash = md5(password + salt)
		const userObj = new User({username: username, salt: salt, hash: hash})
		const profileObj = new Profile({ username: username, dob: dob, email: email, zipcode: zipcode, avatar: null,
					headline: "new user default headline", following: []})
		new User(userObj).save(function(err, user){
			if(err) throw err
		})
		new Profile(profileObj).save(function(err, profile){
			if(err) throw err
		})
		res.status(200).send({result: 'success', username: username})
	})
	
}

function logout(req, res) {
	if (req.isAuthenticated()) {
		req.session.destroy()
		req.logout()
		res.status(200).send("OK")
	} else {
		redis.del(req.cookies[cookieKey])
		res.clearCookie(cookieKey)
		res.status(200).send('OK');		
	}
}

function putPassword(req, res) {
	const username = req.username;
    const password = req.body.password;
    if(!password){
        res.sendStatus(400).send('Put password error')
        return
    }
    User.find({username: username}).exec(function(err, users){
    	const userObj = users[0]
    	const oldSalt = userObj.salt
    	const oldHash = userObj.hash
    	if(md5(password + oldSalt) === oldHash) {
    		res.status(400).send({username: username, status: 'Please use another password'})
    	} else {
    		const salt = md5(username + new Date().getTime())
    		const hash = md5(password + salt)
    		User.update({username: username}, {$set: { salt: salt, hash: hash}}, {new: true}, function(err, user) {
    			if(err) throw err
    			else {
    				res.send({ username: username, status:'Password changed' })
    			}
    		})
    	}
    })
}

function profile(req, res) {
	res.send('ok now what', req.user)
}

function isRegularAccountAuthorized(req, obj) {
	var salt = obj.salt
	var pass = req.body.regularPassword
	var rehash = md5(pass + salt)
	return obj.hash === rehash	
}

//link facebook account with regular account
const linkfb = (req, res) => {
	const username = req.body.regularUsername;
	const password = req.body.regularPassword;
	if (!username || !password) {
		res.status(400).send({result: 'should fill both username and password'})
		return
	}
	User.find({username: username}).exec(function(err, users){
        if (!users || users.length === 0){
            res.sendStatus(400).send({result: 'No matched username'})
            return
        }
        const userObj = users[0]
		if(!userObj){
			res.status(400).send({result: 'No matched username'})
		}
		if(isRegularAccountAuthorized(req, userObj)){
			//combine the articles, comments, and following users
			Article.update({author:req.username}, {$set: {'author': username}}, { new: true, multi: true }, function(){})
			Article.update({'comments.author' : req.username}, { $set: {'comments.$.author': username}}, { new: true, multi: true  }, function(){})
			Comment.update({author:req.username}, {$set: {'author': username}}, { new: true, multi: true  }, function(){})
			Profile.findOne({username: req.username}).exec(function(err, profile){
				if(profile){
					Profile.findOne({username: username}).exec(function(err, newProfile) {
						if(newProfile){
							const newFollowingUsers = newProfile.following.concat(profile.following)
							Profile.update({username: username}, {$set: {'following': newFollowingUsers}}, function(){})
						}
					})
					Profile.update({username: req.username}, {$set: {'headline': "I am a fb user", 'following':[], 'email': null, 'zipcode': null, 'dob': new Date(1994,11,09).getTime(), 'avatar': null}}, function(){})
				}
			})			
			User.findOne({username: username}).exec(function(err, user){
				if(user){
					const usrArr = req.username.split('@');
					const authObj = {}
					authObj[`facebook`] = usrArr[0]
					User.update({username: username}, {$addToSet: {'auth': authObj}}, {new: true}, function(){})
				}
			})
			res.status(200).send({ username: username, result: 'success'})
		} else{
			res.status(401).send({reuslt: 'Please enter correct password'})
		}
	})
}

const reportSuccess = (req,res) => {
	res.redirect(hostUrl)
}

const reportError = (err,req,res,next) => {
	// You could put your own behavior in here, fx: you could force auth again...
    // res.redirect('/auth/facebook/');
    if(err) {
        res.status(400);
        res.send({err: err.message});
    }
}

const unlinkfb = (req, res) => {
	const username = req.username
	//const company = 'facebook'
	User.findOne({username: username}).exec(function(err, user){
		if(user.auth.length !== 0){
			User.update({username: username}, {$set: {auth: []}}, {new: true}, function(){
				res.status(200).send({result: 'unlink facebook success'})
			})
		} else {
			res.status(400).send("no link account")
		}
	})
}

const getFrontEndUrl = (req, res, next) => {
	if(hostUrl === ''){
		hostUrl = req.headers.referer
		console.log(hostUrl)
	}
	next()
}

module.exports = (app) => {
	app.use(cookieParser())
	app.use(getFrontEndUrl)
	app.use(session({secret:'cz32Comp531SecretMessage', resave: false, saveUninitialized: false}))
	app.use(passport.initialize())
	app.use(passport.session())
	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/callback', passport.authenticate('facebook', {failureRedirect:'/fail'}), reportSuccess, reportError)	
	app.get('/', index)
    app.post('/login', login)
    app.post('/register', register)
    app.use(isLoggedIn)
    app.get('/unlinkfb', unlinkfb)
	app.post('/linkfb', linkfb)
    app.put('/logout', logout)
    app.put('/password', putPassword)
    app.use('/profile', profile)
}