const express = require('express');
const port = 8000;
const app = express();
const db = require('./config/mongoose');


app.get('/', (req,res) =>{
    return res.send("helo");
})

app.listen(port, function(err){
    if(err) {console.log("error"); return;}
    console.log(`Server is running on port: ${port}`);
});