var http = require('http')

var host = '127.0.0.1'
var port = 3333

http.createServer(preprocess).listen(port, host)
console.log('Server running at http://' + host + ':' + port)

function preprocess(req, res) {
     var body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     if(req.method === "GET"){
          if(req.url==='/'){
               var payload = { 'hello': 'world' }
          } else if(req.url==='/articles'){
               var payload = { 'articles' : [ 
                              { id:1, author: 'Scott', body:'A post' }, 
                              { id:2, author: 'Chenlai', body:'Another post' }, 
                              { id:3, author: 'Zhang', body:'One more post' } 
                         ]}
          }          
     } else if(req.method === "POST"){
          if(req.url==='/login'){
               var data = JSON.parse(req.body)
               var payload = { 'username' : data.username, 'result': 'success' }
          }
     } else if(req.method === "PUT"){
          if(req.url==='/logout') {
               var payload = 'OK'
          }         
     }
     
     res.setHeader('Content-Type', 'application/json')
     if(typeof payload === 'undefined'){
          res.statusCode = 202
          res.end(JSON.stringify("Request Error"))

     } else{
          res.statusCode = 200
          res.end(JSON.stringify(payload))
     }
}