const User = require("../models/User")

// create new user
exports.signinUser = async(req,res) =>{
    //console.log(req.body);
    try {
        const user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({message: "User already exist."})
        }
        const newUser = await User.create(req.body);
        if(!newUser){
            return res.status(400).json({message: "User creation error"})
        }
        return res.status(200).json({message: "User created successfully"})
    } catch (error) {
        return res.status(500).json({message: "Internal server error."})
    }
}

// get all user
exports.getUser = async(req,res) =>{
    try {
        const user = await User.find();
        if(user.length == 0){
            return res.status(400).json({message: "User not found"})
        }
        return res.status(200).json({user,message: "User creation error"});
    } catch (error) {
        return res.status(500).json({message: "Internal server error."})
    }
}

// login user
exports.loginUser = async(req,res) =>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({message: "Invalid email"})
        }

        if(user.password !== req.body.password){
            return res.status(400).json({message: "Invalid password"})
        }
        return res.status(200).json({user,message: "User successfully found."})
    } catch (error) {
        return res.status(500).json({message: "Internal server error."})
    }
}




