const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const RecipientSchema = Schema({
    email:{
        type: String
    },

    responsed:{
        type: Boolean,
        default: false
    },

    // survey:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'surveys'
    // }
})    


module.exports = RecipientSchema