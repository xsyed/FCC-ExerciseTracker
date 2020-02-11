const mongoose = require('mongoose')
const shortid = require('shortid')

const User = mongoose.model('user',{
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    userId: {
        type: String,
        default: shortid.generate()
    }
})

module.exports = User