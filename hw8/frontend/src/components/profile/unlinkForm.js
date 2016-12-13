import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { unlinkFaceBook } from './profileActions'

const UnlinkForm = ({dispatch}) => {

	return (	
        <div className="btnunlink">
            <button className="button" type="button" id="unLinkAccountBtn" 
            	onClick = {() => {dispatch(unlinkFaceBook())}}>UnLink FaceBook Account</button>
        </div>
	)
}

export default connect()(UnlinkForm)
