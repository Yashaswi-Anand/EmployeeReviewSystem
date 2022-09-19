const mongoose = require('mongoose');

const performanceReviewList = mongoose.Schema({
    performanceItems:{
        type:String,
    },
})

const PerformanceList = mongoose.model('PerformanceList',performanceReviewList);
module.exports = PerformanceList;