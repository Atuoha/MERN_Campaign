const mongoose = require('mongoose'),
    RecipientSchema = require('./Recipient')
    Schema = mongoose.Schema;


const SurveySchema = Schema({
    title:{
        type: String
    },

    subject:{
        type: String
    },

    body:{
        type: String
    },

    recipients:[RecipientSchema],

    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    
    yes:{
        type: Number,
        default: 0
    },

    no:{
        type: Number,
        default: 0
    },
    
    dateSent: Date,

    lastResponded: Date
})    


module.exports = mongoose.model('surveys', SurveySchema)