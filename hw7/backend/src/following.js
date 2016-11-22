'use strict'

const Profile = require('./model.js').Profile

const getFollowing = (req, res) =>{
    const username = req.params.user ? req.params.user : req.username
    Profile.find({username:username}).exec(function(err, profile){
        if(err) throw err
        if(profile !== null && profile.length !== 0){
            const profileObj = profile[0]
            res.status(200).send({username:username, following: profileObj.following})           
        }
    })
}

const putFollowing = (req, res) =>{
    const user = req.params.user
    const username = req.username
    if(!user) {
        res.status(400).send('Put following error')
        return
    }
    Profile.find({username:user}).exec(function(err, profile){
        if(profile === null || profile.length === 0) {
            res.status(400).send('Please enter valid username to follow')
            return
        }
        Profile.findOneAndUpdate({username: username}, { $addToSet: {following: user}}, {upsert:true, new:true}, function(err, profile){})
        Profile.find({username: username}).exec(function(err, profile){
            const profileObj = profile[0]
            res.status(200).send({username: username, following: profileObj.following})
        })
    })
}

const deleteFollowing = (req, res)=>{
    const user = req.params.user
    const username = req.username
    if(!user) {
        res.status(400).send('Delete following error')
    }
    Profile.findOneAndUpdate({username: username}, { $pull: {following: user}}, {new:true}, function(err, profile){})
    Profile.find({username: username}).exec(function(err, profile){
        const profileObj = profile[0]
        res.status(200).send({username: username, following: profileObj.following})
    })
}

module.exports = (app) => {
    app.delete('/following/:user', deleteFollowing)
    app.put('/following/:user', putFollowing)
    app.get('/following/:user?',getFollowing)  
}