const User = require("../models/User")

// create new user
exports.createUser = async(req,res) =>{
    console.log(req.body);
    try {
        const user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({message: "User already exist."})
        }
        if(req.body.password !== req.body.confirm_password){
            return res.status(400).json({message: "confirm password is mismatch."})
        }
        const newUser = await User.create({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            status: req.body.status
        });
        if(!newUser){
            return res.redirect('/');
        }
        //return res.status(200).json({message: "User created successfully"})
        return res.render('signIn',{title:"SignIn"});
    } catch (error) {
        return res.status(500).json({message: "Internal server error."})
    }
}

// signUp user
exports.signUp = async(req,res) =>{
    return res.render('signUp',{title:"ERS | SignUp"});
}

// signIn user
exports.signIn = async(req,res) =>{
    return res.render('signIn',{title:"SignIn"});
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
        // return res.status(200).json({user,message: "User successfully found."})
        return res.render('dashboard',{
            title:"EWS | Dashboard",
            user:user
        });
    } catch (error) {
        return res.status(500).json({message: "Internal server error."})
    }
}




