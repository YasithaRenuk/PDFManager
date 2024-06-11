const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Name:{
        type : String,
        require:true
    },
    Email:{
        type:String,
        unique:true,
        require:true
    },
    Password:{
        type:String,
        require:true
    }
})

const User = mongoose.model("Users",UserSchema)

module.exports = User;