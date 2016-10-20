import React from 'react'
import { connect } from 'react-redux'
import { navToMain, navToProfile } from '../../actions'
import { logout } from '../auth/authActions'

const Nav = ({username, onProfile, dispatch}) => (
    <nav>
      <div>
        {/*
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          </button>
          <a className="navbar-brand" href="#">DH Inc.</a>
        </div>
        */}
        { username.length == 0 ? '' :
          <div>      
            { onProfile ?
              <li className="button"><a href="#" onClick={() => { dispatch(navToMain()) }}>Home</a></li> :
              <li className="button"><a href="#" onClick={() => { dispatch(navToProfile()) }}>Edit Your Profile</a></li>
            }
            <li className="button"><a href="#" onClick={() => { dispatch(logout()) }}>Log out {username} </a></li>
          </div>
        }
      </div>
    </nav>
)

export default connect(
  (state) => {
    return {
      username: state.profile.username || '',
      onProfile: state.common.location == 'profile' }
  })(Nav)



/** WEBPACK FOOTER **
 ** ./src/components/main/nav.js
 **/