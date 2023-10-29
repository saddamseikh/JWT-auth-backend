const userModel = require("../model/userSchema");
const emailValidator = require('email-validator')

const signup = async (req, res, next) =>
{

    const { name, email, password, confirmPassword }=req.body;
    console.log(name, email, password, confirmPassword);

    //validation 
    //every filed required
    if(!name || !email || !password || !confirmPassword)
    {
        return res.status(400).json({
            success : false,
            message:" Fill up every filed"
        })
    }
    // valid email check 
    const validEmail = emailValidator.validate(email);
    if(!validEmail){
        return res.status(400).json({
            success : false,
            message:" please provide a Valid Email id "
        })
    }
    if(password !== confirmPassword){
        return res.status(400).json({
            success : false,
            message:" Password and ConfirmPassword doesnot match "
        })
    }

//databse level  validation 
    try{
         //database store 
    const userInfo = userModel(req.body);
    const result =  await userInfo.save();


    return res.status(200).json({
        succuess: true,
        data:result
     });

    }catch(e){
        //11000 code is dublicate entry 
        if(e.code ===11000 ){
            return res.status(400).json({
                success : false,
                message:"Account already exist provided email id "
            })
        }
        return res.status(400).json({
            success : false,
            message:e.message
        })
    }
   
}

module.exports = {
    signup,
}