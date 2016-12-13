import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, findClassName, findAllCSS } from './selenium'
import common from './common'

const webdriver = require('selenium-webdriver')

describe('Test Frontend login', () => {
    const preamble = 'you are logged in as'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should successfully log in', (done) => {
        sleep(500)
        .then(expect(findId('headline')).to.exist)
        .then(done)
    })

    it('Should post a new article', (done) => {
        sleep(500)
        .then(findId('postarea').clear())
        .then(findId('postarea').sendKeys("a new article"))
        .then(findId('postBtn').click())
        .then(sleep(500))
        .then(findClassName('media-body').getText()
        	.then((text)=>{ expect(text).to.be.eql("a new article")}))
        .then(sleep(500))
        .then(done)
    })

    it('Shoule edit an article', (done) => {
    	var newarticle
		sleep(500)
		.then(findClassName('media-body').getText()
			.then (text => { 
				newarticle = text + " add something here" 
				sleep(500)
				findClassName('media-body').clear()
				findClassName('media-body').sendKeys(newarticle)
				findClassName('postEditbutton').click()
				sleep(500)
			}))
		.then(findClassName('media-body').getText()
			.then(text => { expect(text).to.equal(newarticle) }))			
		.then(done)
    })

    it('should update the status headline', (done) => {
        const newHeadline = "new headline"
        const oldHeadline = "old headline"
        findId('newheadline').sendKeys(oldHeadline)
        .then(findId('headlineBtn').click())
        .then(sleep(1000))
        .then(findId('headline').getText()
        	.then( text => { expect(text).to.equal(oldHeadline) }))
        .then(findId('newheadline').clear())
        .then(findId('newheadline').sendKeys(newHeadline))
        .then(findId('headlineBtn').click())
        .then(sleep(1000))
        .then(findId('headline').getText()
            .then( text => { expect(text).to.equal(newHeadline) }))
        .then(done)
    })

    it('Should add "Follower" to the followed list', (done) => {
    	
		var followerCount
		sleep(500)
		.then(findAllCSS('[name = "follower"]')
			.then(followers => {
				followerCount = followers.length
				findId('add_follower').sendKeys('Follower')
				sleep(500)
				findId('addFollowerBtn').click()
				sleep(500)
				findAllCSS('[name = "follower"]')
				.then(followers => {
					expect(followers.length).to.equal(followerCount+1)
				})
			})
			.then(done))		
    })

    it('Should remove "Follower" from the followed list', (done) => {
		var followerCount
		sleep(500)
		.then(findAllCSS('[name = "follower"]')
			.then(followers => {
				followerCount = followers.length
				findClassName('unfollow').click()
				sleep(500)
				findAllCSS('[name = "follower"]')
				.then(followers => {
					expect(followers.length).to.equal(followerCount-1)
				})
			})
			.then(done))
    })

    it('Should search for "Only One Article Like This"', (done) => {
    	const searchkey = "Only One Article Like This"
    	sleep(1000)
    	.then(findId('search').clear())
    	.then(findId('search').sendKeys(searchkey))
    	.then(sleep(1000))
    	.then(findClassName('media-body').getText()
    		.then(text => {expect(text.indexOf(searchkey)).to.not.equal(-1)}))
    	.then(done)
    })

    it('should update the users email', (done) => {
    	const oldEmail = "old@rice.edu"
    	const newEmail = "new@rice.edu"
    	sleep(1000)
    	.then(findId('navProfile').click())
    	.then(sleep(1000))
    	.then(expect(findId('profileImg')).to.exist)

        .then(findId('email').clear())
        .then(findId('email').sendKeys(oldEmail))
        .then(findId('updateBtn').click())
        .then(sleep(1000))
        .then(findId('email').getAttribute('placeholder')
        .then(text=>{ expect(text).to.eql(oldEmail) }))
        .then(findId('email').clear())
        .then(findId('email').sendKeys(newEmail))
        .then(findId('updateBtn').click())
        .then(sleep(1000))
        .then(findId('email').getAttribute('placeholder')
        .then(text=>{ expect(text).to.eql(newEmail) }))
        .then(done)
    })

    it('should update the users zipcode', (done) => {
    	const oldZip = "77005"
    	const newZip = "77030"
    	sleep(1000)
        .then(findId('zipcode').clear())
        .then(findId('zipcode').sendKeys(oldZip))
        .then(findId('updateBtn').click())
        .then(sleep(1000))
        .then(findId('zipcode').getAttribute('placeholder')
        .then(text=>{ expect(text).to.eql(oldZip) }))
        .then(findId('zipcode').clear())
        .then(findId('zipcode').sendKeys(newZip))
        .then(findId('updateBtn').click())
        .then(sleep(1000))
        .then(findId('zipcode').getAttribute('placeholder')
        .then(text=>{ expect(text).to.eql(newZip) }))
        .then(done)
    })

    it('should update the users password', (done) => {
    	sleep(1000)
        .then(findId('password').clear())
        .then(findId('password').sendKeys('password'))
        .then(findId('pwconf').clear())
        .then(findId('pwconf').sendKeys('password'))
        .then(findId('updateBtn').click())
        .then(sleep(1000))
        .then(findId('errorMessage').getText()
        	.then((text)=>{ expect(text).to.equal('will not change password')}))
        .then(sleep(500))
        .then(done)
    })

    after('should log out', (done) => {
        sleep(500)
        common.logout().then(done)
    })
})