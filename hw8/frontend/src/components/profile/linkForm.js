import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { linkFaceBook } from './profileActions'

class LinkForm extends Component {

	componentDidUpdate() {
        if (this.props.error.length == 0) {
            this.regularUsername.value = null
            this.regularPassword.value = null
        }
    }

    render() { return (
        <form onSubmit={(e) => {
            if (e) e.preventDefault()
            const payload = {
         		regularUsername:this.regularUsername.value,
                regularPassword:this.regularPassword.value
            }
            this.props.dispatch(linkFaceBook(payload))
        }}>
        
          
            <h2><b>Only FaceBook logged in users can use "link" button</b></h2>
            <h2><b>Both regular and FaceBook logged in users can use "unlink" button</b></h2>
            <table className="index_table">
                        
                    <tr>
                        <td>Regular Account Username</td>
                        <td><input id="regularUsername" type="text" ref={(node) => this.regularUsername = node }/></td>
                    </tr>
                    <tr>
                        <td>Regular Account Password</td>
                        <td><input id="regularPassword" type="password" ref={(node) => this.regularPassword = node }/></td>
                    </tr>
            </table>
            <br />
            <div className="btnlink">
                <button className="button" type="submit" id="linkAccountBtn">Link Regular Account</button>
            </div>
    	</form>
    )}
}

LinkForm.propTypes = {
    error: PropTypes.string.isRequired,
    regularUsername: PropTypes.string.isRequired,
   	regularPassword: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect(
    (state) => {
        return {
            error: state.common.error,
            regularUsername: state.profile.regularUsername,
            regularPassword: state.profile.regularPassword
        }
    }
)(LinkForm)

export { LinkForm as PureLinkForm }