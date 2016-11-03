const cookieParser = require('cookie-parser') 
const md5 = require('md5');

var User = {users: [{username: "", salt: "", hash: ""}]}

var cookieKey = 'sid'

function register(req, res) {
	var username = req.body.username
	var password = req.body.password
	if(!username || !password){
		res.sendStatus(400)
		return
	}
	var salt = 0;
	for(var i=0; i<5; i++){
		salt = salt*10 + Math.floor(Math.random() * 10)
	}
	var hash = md5("" + salt + password);
	User.users.push({username: username, salt: salt, hash: hash});
	res.send({users: [{username: username, salt: salt, hash: hash}]});	
}

function getUser(username) {
	return User.users.filter(r => { return r.username === ''+ username})[0]
}

function isAuthorized(req, obj) {
	var salt = obj.salt
	var pass = req.body.password
	var rehash = md5("" + salt + pass)
	return obj.hash === rehash
}

function generateCode(userObj) {
	return userObj.username.length;
}

function login(req, res) {
	var username = req.body.username
	var password = req.body.password
	if(!username || !password) {
		res.sendStatus(400)
		return
	}
	var userObj = getUser(username)
	if(!userObj || !isAuthorized(req, userObj)) {
		res.sendStatus(401)
		return
	}

	// cookie lasts for 1 hour
	res.cookie(cookieKey, generateCode(userObj), 
		{MaxAge: 3600*1000, httpOnly: true })

	var msg = { username: username, result: 'success'}
	res.send(msg)
}

exports.setup = function(app) {
	app.use(cookieParser());
	app.post('/register', register)
	app.post('/login', login)
}