const mongoose = require('mongoose')
const moment = require('moment')

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

const Exercise = mongoose.model('exercise',{
    username:{
        type: String,
        required:true,
        trim: true
    },
    userId:{
        type: String,
        required:true,
        trim: true
    },
    duration:{
        type: Number,
        required: true,
        min:0,
        max: 1400
    },
    description:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    Date:{
        type: String,
        default:moment().format("ddd MMM DD YYYY")
    },
    date:{
        type: Date,
        default: moment().toDate()
    }
})

module.exports = Exercise