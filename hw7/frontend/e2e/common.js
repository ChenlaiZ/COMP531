import { expect } from 'chai'
import { findId, sleep } from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: "cz32test",
    password: "edge-someone-please"
}

exports.login = () => 
    sleep(500)
    .then(findId('loginUsername').clear())
    .then(findId('loginPassword').clear())
    .then(findId('loginUsername').sendKeys(exports.creds.username))
    .then(findId('loginPassword').sendKeys(exports.creds.password))
    .then(findId('loginButton').click())
    .then(sleep(2000))

exports.logout = () =>
    sleep(500)
    .then(findId('navLogout').click())
    .then(sleep(1000))
    .then(expect(findId('loginButton')).to.exist)
    .then(sleep(1000))
