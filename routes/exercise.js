const express = require('express')
const router = express.Router()
const User = require('../models/users')
const Exercise = require('../models/exercises')
const moment = require('moment')

router.post('/api/exercise/add', async (req,res) => {
    //get username from userId
    let bd = req.body;
    console.log(bd)
    try{
        let username = await User.find({userId:bd.userId})
        console.log(username)
         
        if(!username){
            return res.status(400).send({'error':'Invalid userid'})
        }

        bd['username'] = username[0].username
        if(bd.hasOwnProperty('date')){
            bd['Date'] = moment(bd.date).format("ddd MMM DD YYYY")
            bd['date'] = moment(bd.date).toDate()
        }
        
        console.log(bd)
        const exercise = new Exercise(bd)
        try{
            await exercise.save()
            res.status(201).send(exercise)
        }catch(e){
            res.status(500).send(e)
        }
    } catch(e){
        res.status(500).send(e)
    }
})

//log?userId=&limit=
router.get('/api/exercise/log', async (req,res) => {
    console.log(req.query.userId)
    let {userId,limit,from,to} = req.query
    if(userId === undefined || userId === null || userId === ''){
        return res.status(400).send({'error':'Need userId'})
    }
    try{
        let exercise = null;

        if(from === undefined || from === null || from === ''){
            exercise = await Exercise.find({
                userId
            },'description duration Date -_id').sort({date: -1}).limit(parseInt(limit))
        } else {
            exercise = await Exercise.find({
                userId,
                date:{$gte:moment(from).toDate(),$lte:moment(to).toDate()
                }
            },'description duration Date -_id').sort({date: -1}).limit(parseInt(limit))
   
        }

        let user = await User.find({userId})

        let finalObj = {};
        finalObj.username = user[0].username
        finalObj.userId = userId
        finalObj.count = exercise.length
        
        finalObj.log = exercise

        console.log(exercise)
        res.status(200).send(finalObj)
    } catch(e){
        res.status(500).send(e)
    }
    //res.send({'userId':userId})
})

module.exports = router