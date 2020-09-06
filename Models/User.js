const mongoose = require("mongoose")
const { Int32 } = require("bson")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String
    },
    surname:{
        type: String
    },
    email:{
        type: String
    },
    phone:{
        type: String
    },
    password:{
        type: String
    },
    accountNumber:{
        type: Number
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User