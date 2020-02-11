const express = require('express')
const router = express.Router()
const User = require('../models/users')

router.post('/api/exercise/new-user', async (req,res) => {
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send({'username':user.username,'userId':user.userId})
    } catch(e){
        if(e.code === 11000){
            return res.status(500).send({'error':"Username is taken"})
        }
        res.status(500).send(e)
    }
})

module.exports = router