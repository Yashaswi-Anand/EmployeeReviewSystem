const Feedback = require("../models/feedback");
const User = require("../models/User");

exports.createFeedback = async(req,res) =>{
    try {
        if(req.cookies.userId){
            const userTofeedback = req.params.id;
            const feedback = await Feedback.create({
                feedback: req.body.feedback,
                by_feedback: req.cookies.userId,
            });
            const user = await User.findById(userTofeedback);
            user.feedbacklist.push(feedback.id);
            user.save();
            // console.log(user);
            return res.redirect('/user/employeeView');
        }
        
        //const feedback = await Feedback.create(req.body);
       // console.log(feedback);
    //    return res.redirect('/');
    } catch (error) {
        return res.status(500).json({message: "Internal server error."})
    }
}