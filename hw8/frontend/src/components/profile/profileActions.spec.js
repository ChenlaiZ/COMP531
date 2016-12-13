import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'



let resource, url, profileActions

describe('ProfileActions Test: ', () => {


	beforeEach(() => {
  		if (mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
			url = require('../../actions').apiUrl
          resource = require('../../actions').resource
          profileActions = require('./profileActions')
  		}
	})

	afterEach(() => {
  		if (mockery.enable) {
    			mockery.deregisterMock('node-fetch')
    			mockery.disable()
	  	}
	})

	it('should update headline', (done) => {
  
  		const username = 'user'
  		const headline = 'a new headline'

  		mock(`${url}/headline`, {
    			method: 'PUT',
    			headers: {'Content-Type':'application/json'},
    			json: { username, headline }
  		})

  		profileActions.updateHeadline('does not matter')(
    			fn => fn(action => {
  	  		expect(action).to.eql({ 
  	  			headline, type:'UPDATE_PROFILE'
  	  		})
  	  		done()
  		}))

	})

	it('should fetch the users proile information', (done) => {
  
  		const avatar = 'img'
  		const zipcode = '11111'
  		const email = 'ab.cd@rice.edu'

  		mock(`${url}/avatars`, {
  			method: 'GET',
  			headers: {'Content-Type':'application/json'},
  			json: { avatars : [{avatar}] }
  		})

  		mock(`${url}/zipcode`, {
  			method: 'GET',
  			headers: {'Content-Type':'application/json'},
  			json: { zipcode }
  		})	
  		
  		mock(`${url}/email`, {
  			method: 'GET',
  			headers: {'Content-Type':'application/json'},
  			json: { email }
  		})

      
  		var call = 0;
  		profileActions.fetchProfile()(
  			fn => fn(action => {
            if (call==0){
                expect(action).to.eql({
                    avatar:avatar, type:'UPDATE_PROFILE'
                })
               	call++                 
            }
            else if (call==1){
                expect(action).to.eql({
                    zipcode, type:'UPDATE_PROFILE'
                })
                call++
            }
            else if (call==2){
                expect(action).to.eql({
                    email, type:'UPDATE_PROFILE'
                })
                call++
                done()
            }
  		}))
	})
})