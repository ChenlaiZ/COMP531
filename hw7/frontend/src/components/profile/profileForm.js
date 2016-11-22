import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { updateProfile } from './profileActions'

class ProfileForm extends Component {

    componentDidUpdate() {
        if (this.props.error.length == 0) {
            this.email.value = null
            this.zipcode.value = null
            this.password.value = null
            this.pwconf.value = null
            //this.dob.value = null
        }
    }


    render() { return (        
        <form onSubmit={(e) => {
            if (e) e.preventDefault()
            const payload = {
                email:this.email.value == this.oldEmail ? '' : this.email.value,
                zipcode:this.zipcode.value == this.oldZipcode ? '' : this.zipcode.value,
                password:this.password.value,
                pwconf:this.pwconf.value
            }
            this.props.dispatch(updateProfile(payload))
        }}>
            <table className="index_table">
                <tr>
                    <td>Email Address</td>
                    <td><input id="email" type="text" placeholder={this.props.oldEmail}
                        ref={(node) => this.email = node }/></td>
                </tr>
                <tr>
                    <td>Date of Birth</td>
                    <td>{this.props.oldDob}</td>
                </tr>
                <tr>
                    <td>Zipcode</td>
                    <td><input id="zipcode" type="text" placeholder={this.props.oldZipcode}
                        ref={(node) => this.zipcode = node }/></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input id="password" type="password" placeholder="password"
                        ref={(node) => this.password = node }/></td>
                </tr>
                <tr>
                    <td>Password Confirmation</td>
                    <td><input id="pwconf" type="password"placeholder="password"
                        ref={(node) => this.pwconf = node }/></td>
                </tr>
            </table>
            <br />
            <div className="btnprofile">
                <button className="button" id="updateBtn" type="submit">Update</button> 
            </div>

        </form>
    )}
}

ProfileForm.propTypes = {
    error: PropTypes.string.isRequired,
    oldZipcode: PropTypes.number.isRequired,
    oldEmail: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect(
    (state) => {
        return {
            error: state.common.error,
            oldZipcode: state.profile.zipcode,
            oldEmail: state.profile.email,
            oldDob: state.profile.dob
        }
    }
)(ProfileForm)

export { ProfileForm as PureProfileForm }


/** WEBPACK FOOTER **
 ** ./src/components/profile/profileForm.js
 **/