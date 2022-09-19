const express = require('express');
const { createFeedback } = require('../controller/feedbackController');
const route = express.Router();

route.post('/createFeedback/:id', createFeedback);

module.exports = route