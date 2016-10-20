import React from 'react'

import Headline from './headline'
import Following from './following'
import ArticlesView from '../article/articlesView'
import { navToMain, navToProfile } from '../../actions'
import { logout } from '../auth/authActions'

const Main = () => (
    // This is the main view.
    // On this view we display the user's avatar, their headline,
    // their feed of articles (with a search fiilter),
    // and their list of followers.
    <div>
        <div>
            <h1><b>Rice Book</b></h1>
        </div>
        <div>&nbsp;</div>
        <div className="left_box">
            <Headline/>
            <Following/>
        </div>
        <div className="right_box">
            <ArticlesView/>
        </div>
    </div>
    
)

export default Main



/** WEBPACK FOOTER **
 ** ./src/components/main/main.js
 **/