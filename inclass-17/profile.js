const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadlines = (req, res) => {
	res.send({ headlines: [{
		username: req.params.user,
		headline: 'Hi I am ' + req.params.user
	}]})
}

const putHeadline = (req, res) => {
	res.send({ headlines: [{
		username: 'sep1',
		headline: req.body.headline ||'you did not supply it'
	}]})
}

const getEmail = (req, res) => {
	res.send({ emails: [{
		username: req.params.user,
		email: req.params.user + '@rice.edu'
	}]})		
}

const putEmail = (req, res) => {
	res.send({ emails: [{
		username: 'sep1',
		email: req.body.email ||'you did not supply it'
	}]})	
}

const getZipcode = (req, res) => {
	res.send({ zipcodes: [{
		username: req.params.user,
		zipcode: "77005"
	}]})		
}

const putZipcode = (req, res) => {
	res.send({ zipcodes: [{
		username: 'sep1',
		zipcode: req.body.zipcode ||'you did not supply it'
	}]})	
}

const getAvatars = (req, res) => {
	res.send({ avatars: [{
		username: req.params.user,
		avatar: 'profile.jpg'
	}]})		
}

const putAvatar = (req, res) => {
	res.send({ avatars: [{
		username: 'sep1',
		avatar: req.body.avatar ||'you did not supply it'
	}]})	
}

module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?', getHeadlines)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:user?', getAvatars)
     app.put('/avatar', putAvatar)
}
