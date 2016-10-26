import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {shallow} from 'enzyme'
import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import Action from '../../actions'
import {ArticlesView} from './articlesView'
import {NewArticle} from './newArticle' 

import Reducer from '../../reducers'
import {articles} from '../../reducers'

let initialState = {
    common:{error:'', success: '',location: ''},
    articles:{articles:{}, searchKeyword:'', avatars: {} },
    profile: { username: '',headline: '',avatar: '',email: '',zipcode: ''},
    followers:{ followers: {}}
}


describe('ArticlesView (component tests)', ()=>{

    let articles = { 1:{id:1,author:'sep1', text:'sep1 text'} }  
    let new_article = {id:2,author:'sep2', text:'sep2 text'}
    let new_articles = {...articles, 2: new_article }
    it('should dispatch actions to create a new article',()=> {
        expect(Reducer(Reducer(undefined, {type:'UPDATE_ARTICLES', articles}), {type:'ADD_ARTICLE',article: new_article }))
       .to.eql({...initialState, articles: {...initialState.articles, articles:new_articles }})
    })

}) 

