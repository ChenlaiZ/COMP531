var cookieKey = 'sid'
var session_id

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

function logout(req, res) {
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

module.exports = (app) => {
    app.post('/login', login)
    app.post('/register', register)
    app.put('/logout', logout)
    app.put('/password', putPassword)
}