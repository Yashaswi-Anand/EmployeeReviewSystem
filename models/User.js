const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    performanceReview:{
        type:Number,
        default:1
    },
    participation:{
        type:Boolean,
        default: false
    }
},{ timeStamps: true})

const User = mongoose.model("User", userSchema);
module.exports = User;