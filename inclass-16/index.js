
const express = require('express')
const bodyParser = require('body-parser')
var articleSet = {
		articles: [
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
}

const addArticle = (req, res) => {
     console.log('Payload received', req.body)    
     var newId = articleSet["articles"].length+1
     var newAuthor = "Chenlai"
     var newText = req.body["body"];
     articleSet["articles"][newId-1] = {
     	id: newId,
     	author: newAuthor,
     	text: newText
     }
     res.send(articleSet["articles"][newId-1])
}

const hello = (req, res) => res.send({ hello: 'world' })
const getArticles = (req, res) => {
	res.send(articleSet)
}
 
const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticles)


// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
