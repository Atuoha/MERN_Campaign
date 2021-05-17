const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const UserSchema = new Schema({

    name:{
        type: String
    },

    email:{
        type: String
    },

    password:{
        type: String
    },

    googleId:{
        type: String
    },

    token:{
        type: String
    },

    token_expiry:{
        type: Date
    }
})    

module.exports = mongoose.model('users', UserSchema)