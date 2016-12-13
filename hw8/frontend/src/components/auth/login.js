import React from 'react'
import { connect } from 'react-redux'

import { localLogin, fbLogin } from './authActions'


const Login = ({dispatch}) => {
    let username, password
    return (
        <div className="login_title">
            <table className="index_table">
                <tr>
                    <td>Account Name</td>
                    <td><input id="loginUsername" type="text" placeholder="username"
                        ref={(node) => { username = node }} /></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input id="loginPassword" type="password" placeholder="password"
                        ref={(node) => { password = node }} /></td>
                </tr>   
            </table>
            <div>&nbsp;</div>
            <div className="btnsignin">
                <input className="button" id="loginButton" type="button" value="Log In"
                onClick={() => { dispatch(localLogin(username.value, password.value)) }}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input className="button" type="button" id="img_lgn_fb" value="FaceBook Login"
                onClick = {() => {dispatch(fbLogin())}}/>
            </div>         
        </div>            
    )
}

export default connect()(Login)



/** WEBPACK FOOTER **
 ** ./src/components/auth/login.js
 **/