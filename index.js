const express = require('express');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const bodyParser = require('body-parser');

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// user routes
app.use('/', require('./routes/userRoutes'));

app.get('/', (req,res) =>{
    return res.send("helo");
})

app.listen(port, function(err){
    if(err) {console.log("error"); return;}
    console.log(`Server is running on port: ${port}`);
});