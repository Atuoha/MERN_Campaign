const mongoose = require('mongoose'),
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

    recipients:{
        type: String
    },

    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})    


module.exports = mongoose.model('surveys', SurveySchema)