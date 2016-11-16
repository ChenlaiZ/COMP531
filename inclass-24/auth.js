const cookieParser = require('cookie-parser') 
const md5 = require('md5');


var redis = require('redis').createClient('redis://h:p8v4ao30184j9nasu2olu32ksur@ec2-54-83-63-242.compute-1.amazonaws.com:11919')

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
	const sid = md5(username)
	redis.hmset(sid, {username})
	// cookie lasts for 1 hour
	res.cookie(cookieKey, sid, 
		{MaxAge: 3600*1000, httpOnly: true })

	var msg = { username: username, result: 'success'}
	res.send(msg)
}

const isLoggedIn = (req, res, next)=> {
	var sid = req.cookies[cookieKey]
	if(!sid) {
		return res.status(401)
	} else {
		redis.hgetall(sid, function(err, userObj) {
			console.log(sid + 'mapped to' + userObj)
			if(userObj) {
				req.username = userObj.username
				next()
			} else {
				return res.status(401)
			}
		})
	}
}

const logout = (req, res) => {
	const sid = req.cookies[cookieKey]
	redis.del(sid)
	res.status(200).send('OK')
}

const index = (req, res) => {
     res.send({ hello: 'world' })
}

module.exports = app => {
	app.use(cookieParser());
	app.get('/', index)
	app.post('/register', register)
	app.post('/login', login)
	app.put('/logout',isLoggedIn, logout)
}