import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ProfileForm from './profileForm'
import Avatar from './avatar'
import LinkForm from './linkForm'
import UnlinkForm from './unlinkForm'

const Messages_ = ({error, success}) => (
     <div>
        <div>
            { error.length == 0 ? '' :
                <div className="alert_error">
                    <div id="errorMessage">{error}</div>
                </div>
            }
            { success.length == 0 ? '' :
                <div className="alert_success">
                    <div id="successMessage">{success}</div>
                </div>
            }
        </div>
    </div>
)

Messages_.propTypes = {
    error: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired
}

const Messages = connect(
    (state) => {
        return {
            error: state.common.error,
            success: state.common.success,
        }
    }
)(Messages_)

const Profile = () => {
    return (
        <div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <h1><b>Customer Profile Page</b></h1>
            <Avatar/>
            <Messages/>
            <ProfileForm/>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <LinkForm/>
            <div>&nbsp;</div>
            <UnlinkForm/>
        </div>
    )
}
export default Profile



/** WEBPACK FOOTER **
 ** ./src/components/profile/profile.js
 **/