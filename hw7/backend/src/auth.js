'use strict'
const cookieKey = 'sid'

const callbackURL = 'http://localhost:3000/auth/callback'
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
const FacebookStrategy = require('passport-facebook').Strategy
const redis = require('redis').createClient('redis://h:p772fh9tcl7s3t1kgbnp2cbrb96@ec2-50-17-239-57.compute-1.amazonaws.com:11379')

passport.serializeUser(function(user, done){
	users[user.id] = user
	done(null, user.id)
})

passport.deserializeUser(function(id,done){
	var user = users[id]
	done(null, user)
})

passport.use(new FacebookStrategy(config,
	function(token, refreshToken, profile, done){
		process.nextTick(function(){
			return done(null,profile);
		})
	}
))

const isLoggedIn = (req, res, next)=> {
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
		res.status(400),send({result: 'should fill both username and password'})
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
	redis.del(req.cookies[cookieKey])
	res.clearCookie(cookieKey)
	res.status(200).send('OK');
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

module.exports = (app) => {
	app.use(cookieParser())
	app.use(passport.initialize())
	app.use(passport.session())
	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))
	app.get('/', index)
    app.post('/login', login)
    app.post('/register', register)
    app.use(isLoggedIn)
    app.put('/logout', logout)
    app.put('/password', putPassword)
    app.use('/profile', profile)
}