const articleSet = [
			{
				id: 1,
				author: "Scott",
				text: "This is my first article",
				date: new Date(),
				comments: ["happy"]
			},
			{
				id: 2,
				author: "Max",
				text: "This is Max's article",
				date: new Date(),
				comments: ["sad"]
			},
			{
				id: 3,
				author: "Leo",
				text: "This is Leo's article",
				date: new Date(),
				comments: ["delighted"]
			}
]


const addArticle = (req, res) => {
     console.log('Payload received', req.body)    
     var newId = articleSet.length+1
     var newAuthor = "cz32"
     var newText = req.body.text;
     var article = {
     	id: newId,
     	author: newAuthor,
     	text: newText,
     	date: new Date(),
     	comments: []
     }
     articleSet.push(article)
     res.send(article)
}

const getArticles = (req, res) => {
	if(req.params.id){
		res.send(articleSet.filter((article) => {
			return article.id == req.params.id
		}))		
	} else {
		res.send(articleSet)
	}
}

module.exports = (app) => {
	app.get('/articles/:id*?', getArticles)
	app.post('/article', addArticle)  
} 