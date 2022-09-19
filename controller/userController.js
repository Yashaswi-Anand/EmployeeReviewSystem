const PerformanceList = require("../models/performanceList");
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
    if(req.cookies.userId){
        const user = await User.findById(req.cookies.userId);
        if(user.status === "admin")
            return res.redirect('/user/dashboard');
        else
            return res.redirect('/user/employeeView');
    }
    return res.render('signUp',{title:"ERS | SignUp"});
}

// signIn user
exports.signIn = async(req,res) =>{
    if(req.cookies.userId){
        const user = await User.findById(req.cookies.userId);
        if(user.status === "admin")
            return res.redirect('/user/dashboard');
        else
            return res.redirect('/user/employeeView');
    }
    return res.render('signIn',{title:"SignIn"});
}

// get all user
exports.getUser = async(req,res) =>{
    try {
        const user = await User.find().populate('performancelist','performanceItems');
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
        // cookies parser
        res.cookie('userId',user.id);
        // return res.status(200).json({user,message: "User successfully found."})
        if(user.status === "admin")
            return res.redirect('/user/dashboard');
        else
            return res.redirect('/user/employeeView');
        
    } catch (error) {
        return res.status(500).json({message: "Internal server error."})
    }
}

exports.dashboard = async(req,res)=>{
    try {
        const users = await User.find();
        const userDate = await User.findById(req.cookies.userId);
        return res.render('dashboard',{
            title:"EWS | Dashboard",
            users:users,
            userName: userDate.userName
        });
    } catch (error) {
        return res.status(500).json({message: "Internal server error."})
    }
}

exports.employeeView = async(req,res) =>{
    try {
        const users = await User.find();
        var performanceReviewList = [];
        for(var u of users){
            const pArray = u.performancelist;
            var alist = {};
        
            var list =[];
            for(var id of pArray){
                const performanceReview = await PerformanceList.findById(id);
                list.push(performanceReview.performanceItems);
            }
            // console.log(list);
            alist[u.email] = list;
            performanceReviewList.push(alist);
        }
        //console.log(performanceReviewList[3]['user4@gmail.com'][0]);
        const userDate = await User.findById(req.cookies.userId);

        return res.render('employeeView',{
            title:"EWS | Dashboard",
            users:users,
            performanceReviewList,performanceReviewList,
            userName: userDate.userName
        });
    } catch (error) {
        return res.status(500).json({message: "Internal server error."})
    }
}

// employee delete
exports.deleteEmployee = async(req,res) =>{
    const userId = req.params.id;
    console.log(userId);
    const user = await User.findByIdAndDelete(userId);
    return res.redirect('/user/dashboard');
}

exports.editEmployee = async(req,res) =>{
    if(!req.cookies.userId){
        return res.redirect('/user/signIn');
    }
    const userId = req.params.id;
    const user = await User.findOne({"_id": userId});
    //console.log(user);
    var myPerformanceList = [];
    const performanceList = user.performancelist;
    
    for(let id of performanceList){
        const item = await PerformanceList.findById(id);
        //console.log(item);
        myPerformanceList.push(item.performanceItems);
    }
    //console.log(myPerformanceList);
    return res.render('editEmployee', {title: "Edit Employee", user: user, myPerformanceList:myPerformanceList});
}

exports.updateEditedEmployee = async(req,res) =>{
    const userId = req.params.id;
    console.log(req.body);
    const user = await User.findOne({'_id': userId});
    var performanceCount = user.performancelist.length;

    // create performance
    if(req.body.performanceName !== ""){
        var performanceItem = await PerformanceList.create({
            performanceItems:  req.body.performanceName
        });
        //console.log(performanceItem);
        
        user.performancelist.push(performanceItem.id);
        user.save();
        //console.log(user.performancelist);
            
        performanceCount = user.performancelist.length;
        //console.log(performanceCount);
    }
    
    // update date
    await User.findByIdAndUpdate(userId,{
        userName : req.body.userName,
        email: req.body.email,
        password : req.body.password,
        status: req.body.status,
        performanceReview: Number(performanceCount),
        participation: req.body.participation
    })
    
    return res.redirect('/user/dashboard');
}

exports.addEmployee = (req,res) =>{
    if(req.cookies.userId){
        return res.render('addNewEmployee', {title: "Add New Employee"});
    }
    return res.redirect('/user/signIn');
}

exports.addNewEmployee = async(req,res) => {
    //console.log(req.body);
    await User.create(req.body);
    return res.redirect('/user/dashboard');
}

// logout
exports.logout = (req,res) =>{
    res.clearCookie('userId');
    return res.redirect('/user/signIn');
}



