# Employee Review System

## _Fullstack app with Nodejs & Ejs._

This application that allow to submit feedback toward each other's performance. Any employee register and login this application after that views performance rating and review their peformance for gives some feedbacks.

## Features
- Register and login employee as well as admin.
- Admin views all employee and edit some date.
- Admin adds new employee.
- Admin makes an employee as an admin.
- Admin assign an employee to participate in another employee's performance review.
- 1 page for admin and employee login.
- After login an employee, can see list of performanec review requiring feedback.
- Employee submit feedback.

## Routes
- SignUp: /user/signUp
- SignIn: /user/signIn
- Admin dashboard: /user/dashboard
- Employee dashboard: /user/employeeView
- Add employee: /user/addEmployee
- Edit employee: /user/editEmployee/:id
- Delete employee: /user//deleteEmployee/:id
- Add feedback: /feedback/createFeedback/:id

# Tech
- Nodejs
- Expressjs
- Ejs
- MongoDB

## Project Demo
# SignUP
![image](https://github.com/Yashaswi-Anand/EmployeeReviewSystem/blob/master/screenshots/signup.png)
# SignIn
![image](https://github.com/Yashaswi-Anand/EmployeeReviewSystem/blob/master/screenshots/signin.png)
# Add Employee
![image](https://github.com/Yashaswi-Anand/EmployeeReviewSystem/blob/master/screenshots/add.png)
# Edit Employee
![image](https://github.com/Yashaswi-Anand/EmployeeReviewSystem/blob/master/screenshots/edit.png)
# Admin Dashboard
![image](https://github.com/Yashaswi-Anand/EmployeeReviewSystem/blob/master/screenshots/admin.png)
# Employee Dashboard
![image](https://github.com/Yashaswi-Anand/EmployeeReviewSystem/blob/master/screenshots/employee.png)


## Deployment
- Heroku (nodejs server)
- MongoDB Atlas (for database)

## Hosted Url
https://employees-review-system.herokuapp.com/