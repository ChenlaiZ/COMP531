import React from 'react'

import Headline from './headline'
import Following from './following'
import ArticlesView from '../article/articlesView'

const Main = () => (
    // This is the main view.
    // On this view we display the user's avatar, their headline,
    // their feed of articles (with a search fiilter),
    // and their list of followers.
    <div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <nav>
            <div>
                <h1><b>Rice Book</b></h1>
            </div>
            <div>
                &nbsp;&nbsp;
                <input type="button" className="button" value="Profile" id="login" />
                &nbsp;&nbsp;
                <input type="button" className="button" value="Logout" id="logout" />
            </div>
        </nav>
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