const following = {
    users:{
    	'cz32':['cz32test','test1','test2'],
        'sampleUser':['cz32','test1','test2'],
    }
}

const getFollowing = (req, res) =>{
    if (!req.user) req.user = 'cz32'
    const user = req.params.user ? req.params.user : req.user
    res.send({
        username: user,
        following: following.users[user]
    })
}

const putFollowing = (req, res) =>{
    if (!req.user) req.user = 'cz32'
    if (!following.users[req.user].includes(req.params.user)){
        following.users[req.user].push(req.params.user)
    }
    res.send({
        username: req.user,
        following: following.users[req.user]
    })
}

const deleteFollowing = (req, res)=>{
    if (!req.user) req.user = 'cz32'
    following.users[req.user] = following.users[req.user].filter((v)=>{
								        return v != req.params.user
								    })
    res.send({
        username: req.user,
        following: following.users[req.user]
    })
}

module.exports = (app) => {
    app.delete('/following/:user', deleteFollowing)
    app.put('/following/:user', putFollowing)
    app.get('/following/:user?',getFollowing)  
}