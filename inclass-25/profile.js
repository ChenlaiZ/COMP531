'use strict'
let articleSet = [
			{
				id: 1,
				author: "Scott",
				text: "This is my first article"
			},
			{
				id: 2,
				author: "Max",
				text: "This is Max's article"
			},
			{
				id: 3,
				author: "Leo",
				text: "This is Leo's article"
			}
]
const uploadImage = require('./uploadCloudinary')

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
   //fileurl = "http://res.cloudinary.com/hx2trslbc/image/upload/v1479420582/g0nf0zuvztr43l5qlvvx.jpg"
   // create an image tag from the cloudinary upload
   if(!req.fileid || !req.fileurl){
   		res.status(401).send('error upload image')
   } else {
	   const image = cloudinary.image(req.fileid, {
	       format: "png", width: 100, height: 130, crop: "fill" 
	   })
	   // create a response to the user's upload
	   res.status(200).send(`Uploaded: ${req.fileurl}<br/><a href="${req.fileurl}">${image}</a>`);
   }
}

const addArticle = (req, res) => {
     console.log('Payload received', req.body)    
     var newId = articleSet.length+1
     var newAuthor = "Chenlai"
     var newText = req.body.text;
     var article = {
     	id: newId,
     	author: newAuthor,
     	text: newText
     }
     articleSet.push(article)
     res.send({'articles':[article]})
}

const getArticles = (req, res) => {
	if(req.params.id){
		res.send({articles:articleSet.filter((article) => {
			return article.id == req.params.id
		})})		
	} else {
		res.send({articles:articleSet})
	}
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
     //app.put('/avatar', putAvatar)
     app.get('/articles/:id*?', getArticles)
	 app.post('/article', addArticle)
	 app.put('/avatar', uploadImage('avatar'), putAvatar)
}
