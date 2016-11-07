// this is profile.js which contains all user profile 
// information except passwords which is in auth.js

const profile = {
		profiles: {
			'cz32':{
				headline: 'my headline',
				dob: (new Date('04/01/1995')).toDateString(),
				email:'cz32@rice.edu',
				zipcode: 77030,
				avatar: 'myAvatar'
			},
			'test1':{
				headline: 'test1 headline',
				dob: (new Date('11/09/1994')).toDateString(),
				email:'test1@gmail.com',
				zipcode: 11111,
				avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg'
				
			},
			'test2':{
				headline: 'test2 headline',
				dob: (new Date('09/26/1982')).toDateString(),
				email:'test2@gmail.com',
				zipcode: 22222,
				avatar: 'test2Avatar'
			},
			'test3':{
				headline: 'test3 headline',
				dob: (new Date('04/19/1991')).toDateString(),
				email:'test3@gmail.com',
				zipcode: 33333,
				avatar: 'test3Avatar'
			}
		}
	}


const getHeadlines = (req, res) => {
    if (!req.user) req.user = 'cz32'
    const users = req.params.users ? req.params.users.split(',') : [req.user]
	const headlines = users.map((r)=>{
		return {
			username: r,
			headline: profile.profiles[r].headline
		}
	})
	res.send({headlines})
}

const putHeadline = (req, res) => {
	if (!req.user) req.user = 'cz32'
	profile.profiles[req.user].headline = req.body.headline
	res.send({
			username: req.user, 
			headline: profile.profiles[req.user].headline
		})
}

const getDob = (req, res) =>{
	if (!req.user) req.user = 'cz32'
	res.send({
			username: req.user,
			dob: profile.profiles[req.user].dob	
		})
}

const getEmails = (req, res) => {
	if (!req.user) req.user = 'cz32'
	const user = req.params.user ? req.params.user : req.user
	res.send({
			username: user,
			email: profile.profiles[user].email	
		})
}

const putEmail = (req, res) => {
	if (!req.user) req.user = 'cz32'
	profile.profiles[req.user].email = req.body.email
	res.send({
			username: req.user, 
			email: profile.profiles[req.user].email
		})
}

const getZipcodes = (req, res) => {
	if (!req.user) req.user = 'cz32'
	const user = req.params.user ? req.params.user : req.user
	res.send({
			username: user,
			zipcode: profile.profiles[user].zipcode	
		})
}

const putZipcode = (req, res) => {
	if (!req.user) req.user = 'cz32'
	profile.profiles[req.user].zipcode = parseInt(req.body.zipcode)
	res.send({
			username: req.user, 
			zipcode: profile.profiles[req.user].zipcode
		})
}

const getAvatars = (req, res) => {
	if (!req.user) req.user = 'cz32'
	const user = req.params.user ? req.params.user : req.user
	res.send({
			username: user,
			avatar: profile.profiles[user].avatar	
		})
}

const putAvatar = (req, res) => {
	if (!req.user) req.user = 'cz32'
	profile.profiles[req.user].avatar = req.body.avatar
	res.send({
			username: req.user, 
			avatar: profile.profiles[req.user].avatar
		})
}

module.exports = (app) => {
    app.get('/headlines/:users*?', getHeadlines)
    app.put('/headline', putHeadline)
    app.get('/dob',getDob)
	app.get('/emails/:user*?', getEmails)
	app.put('/email', putEmail)
	app.get('/zipcodes/:user*?', getZipcodes)
	app.put('/zipcode', putZipcode)
	app.get('/avatars/:user*?', getAvatars)
	app.put('/avatar', putAvatar)    
} 