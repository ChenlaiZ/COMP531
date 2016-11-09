const express = require('express')
const bodyParser = require('body-parser')

const middleware = (req, res, callback) => {
    res.header('Access-Control-Allow-Origin',req.headers.origin)
    res.header('Access-Control-Allow-Credentials',true)
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers','Authorization, Content-Type')

    callback()
}

const getHeadlines = (req, res) => {
	res.send({username:"cz32",headline: "this is a test headline"})
}

const app = express()
app.use(bodyParser.json())
app.use(middleware)
app.get('/headlines',getHeadlines)
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})