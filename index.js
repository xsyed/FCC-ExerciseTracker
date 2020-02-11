const express = require('express')
require('dotenv').config()
require('./db/mongoose')
const app = express()
const exerciseRouter = require('./routes/exercise')
const userRouter = require('./routes/user')

//app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(exerciseRouter)
app.use(userRouter)

app.use(express.static('public'))
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html')
})

app.use((req, res, next) => {
    return next({status: 404, message: 'not found'})
})

if(process.env.NODE_ENV === 'production'){
    console.log('Deployed to production')
} else{
    console.log('Deployed to development')
}

// Error Handling middleware
app.use((err, req, res, next) => {
    let errCode, errMessage
  
    if (err.errors) {
      // mongoose validation error
      errCode = 400 // bad request
      const keys = Object.keys(err.errors)
      // report the first validation error
      errMessage = err.errors[keys[0]].message
    } else {
      // generic or custom error
      errCode = err.status || 500
      errMessage = err.message || 'Internal Server Error'
    }
    res.status(errCode).type('txt')
      .send(errMessage)
  })


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT} port`)
})