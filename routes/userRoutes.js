const express = require('express');
const { createUser, getUser, loginUser, signUp, signIn } = require('../controller/userController');
const route = express.Router();

// signUp user
route.get('/signUp',signUp);
// signIn user
route.get('/signIn',signIn);
// create new user
route.post('/createUser', createUser);
// get users
route.get('/getUser', getUser);
// user login
route.post('/loginUser',loginUser);

module.exports = route;