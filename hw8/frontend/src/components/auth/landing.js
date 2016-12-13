import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Login from './login'
import Register from './register'

let ErrorMessage = ({error, success}) => (
    <div className="row">
        { error.length == 0 ? '' :
            <div className="alert_error">
                <div id="errorMessage">{ error }</div>
            </div>
        }
        { success.length == 0 ? '' :
            <div className="alert_success">
                <div id="successMessage">{ success }</div>
            </div>
        }
    </div>
)
ErrorMessage.propTypes = {
    error: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired
}
ErrorMessage = connect((state) => {
    return { error: state.common.error, success: state.common.success }
})(ErrorMessage)

const Landing = () => (
    <div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div className="page_title">
            <h1><b>Welcome to My Front-End</b></h1>
        </div>
        <h3><b>New User Registration</b></h3>
        <Register/>
        <div><ErrorMessage/></div>
        <h3><b>Log in</b></h3>
        <Login/>
    </div>
)

export default Landing



/** WEBPACK FOOTER **
 ** ./src/components/auth/landing.js
 **/