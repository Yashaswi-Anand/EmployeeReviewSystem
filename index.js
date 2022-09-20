const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 5005;
const app = express();
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
var cors = require('cors')


//cors
var corsOptions = {
    origin: '*',
}
app.use(cors(corsOptions));

// add static files
app.use(express.static('assets'));
app.use('/CSS',express.static('assets/CSS'));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// cookie parser
app.use(cookieParser());

// set the view engine
app.use(expressLayouts);
// default ejs file
app.set('layout','./Layout/layout');
app.set('view engine', 'ejs');

// user routes
app.use('/user', require('./routes/userRoutes'));
app.use('/feedback',require('./routes/feedbackRoute'));

// app.get('/', (req,res) =>{
//     if(req.cookies.userId){
//         return res.redirect('/user/dashboard')
//     }
//     return res.redirect('/user/signIn');
// })

app.get('/', (req,res) =>{
    res.send('Node js deploy.')
})

app.listen(port, function(err){
    if(err) {console.log("error"); return;}
    console.log(`Server is running on port: ${port}`);
});