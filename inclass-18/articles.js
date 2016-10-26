const express = require('express')
const bodyParser = require('body-parser')
var articleSet = [
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


const addArticle = (req, res) => {
     console.log('Payload received', req.body)    
     var newId = articleSet.length+1
     var newAuthor = "Chenlai"
     var newText = req.body.body;
     var article = {
     	id: newId,
     	author: newAuthor,
     	text: newText
     }
     articleSet.push(article)
     res.send(article)
}

const getArticles = (req, res) => {
	res.send(articleSet)
}

const getArticlesById = (req, res) => {
	res.send(articleSet.filter((article) => {
		return article.id == req.params.id
	}))
}
const app = express()
app.use(bodyParser.json())
app.get('/articles/:id', getArticlesById)
app.get('/articles', getArticles)
app.post('/article', addArticle)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})