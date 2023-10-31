const { use } = require("../app");
const userModel = require("../model/userSchema");
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt')

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

const signin = async (req, res) =>{
    const { email , password } =req.body;
//validation 
    if(!email || !password){
        return res.status(400).json({
            success : false,
            message:"Every field is mandatory"
        })
    }

    try{

        //email id exist in database 
    const user = await userModel
    .findOne({

        email
    })
    .select('+password');

    // 
    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(400).json({
            success : false,
            message:"Invalid "
        })
    }

    const token = user.jwtToken();
    user.password = undefined; //password leek

    const cookieOption = {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true // client side not access 
    };
    //cookie set 
    res.cookie("token" ,token, cookieOption);
    res.status(200).json({
        success:true,
        data: user
    })

    }
    catch(e){

        res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

//
const getUser = async (req, res, next) =>{
    const userId = req.user.id;
    try{

        const user = await userModel.findById(userId)
        return res.status(200).json({
            success:true,
            data:user
        })
    }
    catch(e){
        res.status(400).json({
            success:false,
            message:e.message
        })

    }
}

const logout = (req , res, nest )=>{
    try{
        const cookieOption = {
            expires: new Date(),
            httpOnly:true
        }
        res.cookie("token" ,null , cookieOption)
        res.status(200).json({
            success:true,
            message:"Logout"
        })
    }
    catch(e){
        res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

module.exports = {
    signup,
    signin,
    getUser,
    logout
}