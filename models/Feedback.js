const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    feedback:{
        type:String,
        required:true,
    },
    by_feedback:{
        type: mongoose.Types.ObjectId,
    }
})

const Feedback = mongoose.model('Feedback',feedbackSchema);
module.exports = Feedback;