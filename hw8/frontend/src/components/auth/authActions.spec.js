import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'



describe('Validate authenticate actions', () => {
    let resource, url, authActions
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            resource = require('../../actions').default
            url = require('../../actions').apiUrl
            authActions = require('./authActions')
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    }) 

    it('should not log in an invalid user', (done)=>{

        const username = 'unauthorized'
        const password = 'unauthorized'

        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'text/plain'},
            status: 401,
            statusText: 'Unauthorized'
        })

        authActions.localLogin(username, password)(
            (action)=>{
                expect(action).to.eql({ type:'ERROR', error: 'There was an error logging in as unauthorized' })
                done()
            }
        )
    }) 

    it('should log in a user', (done)=>{

        const username = 'cz32'
        const password = 'breakfast-jump-cause'


        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: {username, result:'success'}
        })

     
        authActions.localLogin(username, password)(
            (action)=>{
                expect(action.type).to.eql('LOGIN_LOCAL')
                expect(action.username).to.eql(username)
                expect(action).to.eql({ type:'LOGIN_LOCAL', username })
                done()
            }
        )
    })

    it('should log out a user (state should be cleared)', (done)=>{
        mock(`${url}/logout`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'}
        })


        authActions.logout()(
            (action)=>{
                expect(action).to.eql({
                    type:'NAV_OUT'
                })
                done()
            }
        )
        
    })
})