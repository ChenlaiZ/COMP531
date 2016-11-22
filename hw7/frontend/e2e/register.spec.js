import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test New User Registeration', () => {

    before('should register', (done) => {
        go().then(done)
    })

    it('should successfully register', (done) => {
        sleep(500)
        .then(findId('username').sendKeys('testuser'))
        .then(findId('email').sendKeys('test@rice.edu'))
        .then(findId('phone').sendKeys('123-456-1234'))
        .then(findId('birth').sendKeys('04011996'))
        .then(findId('zipcode').sendKeys('77030'))
        .then(findId('password').sendKeys('a123456'))
        .then(findId('pwconf').sendKeys('a123456'))
        .then(findId('submitButton').click())
        .then(sleep(500))
        .then(findId('successMessage').then((e)=>{
            expect(e).to.exist
        }))
        .then(sleep(500))
        .then(done)
    })
})
