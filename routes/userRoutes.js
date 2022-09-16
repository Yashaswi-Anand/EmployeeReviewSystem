const express = require('express');
const { signinUser, getUser, loginUser } = require('../controller/userController');
const route = express.Router();

// create new user
route.post('/signinUser', signinUser);
// get users
route.get('/getUser', getUser);
// user login
route.post('/loginUser',loginUser);

module.exports = route;