const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {
	var numofArticles
	it('should give me three or more articles', (done) => {
		// IMPLEMENT ME
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()			
		})
		.then(body => {
			numofArticles = JSON.parse(body).length
			expect(JSON.parse(body).length>=3).to.be.true
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should add a new article, and increase #articles by one', (done) => {
		fetch(url("/article"), {
            method:'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({"text":"this is a new text"})
        })
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.json()				
		})
		.then(res => {
			console.log()
			expect(res.text).to.equal('this is a new text')
		})
		.then(_=>{
			return fetch(url("/articles"))
		})
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()				
		})	
		.then(body => {
			expect(JSON.parse(body).length).to.equal(numofArticles+1)
		})
		.then(done)
		.catch(done)
 	}, 200)


});