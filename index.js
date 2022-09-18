const express = require('express');
const port = 5005;
const app = express();
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');


// add static files
app.use(express.static('assets'));
app.use('/CSS',express.static('assets/CSS'));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// set the view engine
app.use(expressLayouts);
// default ejs file
app.set('layout','./Layout/layout');
app.set('view engine', 'ejs');

// user routes
app.use('/user', require('./routes/userRoutes'));

app.get('/', (req,res) =>{
    return res.send("helo");
})

app.listen(port, function(err){
    if(err) {console.log("error"); return;}
    console.log(`Server is running on port: ${port}`);
});