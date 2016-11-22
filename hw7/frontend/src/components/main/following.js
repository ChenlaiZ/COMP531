import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { addFollower, delFollower, dispatch } from './followingActions'

const Follower = ({name, avatar, headline, dispatch}) => (
    <div className="follower_card" name="follower">
        <img src={ avatar }/>
        <p>{ name }</p>
        <p><em>{ headline }</em></p>
        <p>
            <input className="unfollow" type="button" value="Unfollow" onClick={() => { dispatch(delFollower(name)) }} />
        </p>
        <div>&nbsp;</div>
    </div>
)

Follower.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    headline: PropTypes.string,
    dispatch: PropTypes.func.isRequired
}

class Following extends Component {
    render() { return (
        <div className="user_card">
            <h3><b>Following List:</b></h3>
            { Object.keys(this.props.followers).sort().map((f) => this.props.followers[f]).map((follower) =>
                <Follower key={follower.name}
                    name={follower.name} avatar={follower.avatar} headline={follower.headline}
                    dispatch={this.props.dispatch} />           
            )}
            <div>
                <p><input id="add_follower" type="text" placeholder="add a follower"
                        ref={(node) => this.newFollower = node }
                        onChange={(e) => { this.forceUpdate() }}/></p>
                <div>&nbsp;</div>
                { !(this.newFollower && this.newFollower.value && this.newFollower.value.length > 0) ? '' :
                    <p><input type="button" id="addFollowerBtn" 
                        onClick={() => {
                            this.props.dispatch(addFollower(this.newFollower.value))
                            this.newFollower.value = ''
                            this.forceUpdate()
                        }}
                        value="Add"/></p>
                }
                { this.props.error.length == 0 ? '' :
                    <div className="alert_error">
                        { this.props.error }
                    </div>
                }
            </div>
        </div>
    )}
}

Following.propTypes = {
    error: PropTypes.string.isRequired,
    followers: PropTypes.object.isRequired
}

export default connect(
    (state) => {
        return {
            error: state.common.error,
            followers: state.followers.followers
        }
    }
)(Following)



/** WEBPACK FOOTER **
 ** ./src/components/main/following.js
 **/