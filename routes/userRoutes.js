const express = require('express');
const { createUser, getUser, loginUser, signUp, signIn, dashboard, deleteEmployee, editEmployee, employeeView, updateEditedEmployee, addEmployee, addNewEmployee } = require('../controller/userController');
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
// dashboard
route.get('/dashboard', dashboard);
// delete employee
route.get('/deleteEmployee/:id', deleteEmployee);
// edit employee
route.get('/editEmployee/:id', editEmployee);
// employee dashboard
route.get('/employeeView', employeeView);
// update employee edited date
route.post('/updateEditedEmployee/:id',updateEditedEmployee);
// add new employee
route.get('/addEmployee', addEmployee);
route.post('/addNewEmployee',addNewEmployee);

module.exports = route;