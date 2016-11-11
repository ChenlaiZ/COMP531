var cookieKey = 'sid'
var session_id

const callbackURL = 'http://localhost:3000/auth/callback'
const clientSecret = "9d0cd69d1e8167e68307248e3e79b5e9"
const clientID = "661028574071891"
const config = {clientSecret, clientID, callbackURL}

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const request = require('request')
const qs = require('querystring')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
var users = [];

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

function register(req, res) {
	console.log('register')
	var username = req.body.username
	var email = req.body.email
	var dob = req.body.dob
	var zipcode = req.body.zipcode
	var password = req.body.password

	if(!username || !dob || !zipcode || !email || !password){
		res.status(400).send({result:'Should fill all the fields!'})
		return
	}
	res.status(200).send({result: 'success',username: username});	
}


function login(req, res) {
	var username = req.body.username
	var password = req.body.password
	if(!username || !password) {
		res.status(400),send({result: 'should fill both username and password'})
		return
	}
	session_id = Math.random()*1000
	res.cookie(cookieKey, session_id, 
		{MaxAge: 3600*1000, httpOnly: true })

	var msg = { username: username, result: 'success'}
	res.send(msg)
}

function log_out(req, res) {
	session_id = null
	res.send('OK');
}

function putPassword(req, res) {
    const password = req.body.password;
    if(!password){
        res.sendStatus(400)
        return
    }
    res.send({
	        username:'cz32', 
	        status:'will not change'
	    })
}


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next()
	} else {
		res.redirect('./login')
	}
}

function logout(req, res) {
	req.logout()
	res.redirect('/')
}

function fail(req, res) {
	res.send('failed to login')
}
const index = (req, res) => {
     res.send({ hello: 'world' })
}
function profile(req, res) {
	res.send('ok now what', req.user)
}

module.exports = (app) => {
    app.post('/login', login)
    app.post('/register', register)
    app.put('/logout', log_out)
    app.put('/password', putPassword)

	app.use(session({secret:'dfghjkfghjkdfghjwe'}))
	app.use(passport.initialize())
	app.use(passport.session())
	app.use(cookieParser())
	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))
	app.use('/logout',logout)
	app.use('/profile', isLoggedIn, profile)
	app.use('/fail', fail)
	app.use('/', index)

}