const mongoose = require('mongoose');
const { Schema } = mongoose;

//Schema structure 
const userSchema = new Schema({
    name:{
        type:String,
        required: [true, 'user name is Required'],
        minLength:[5, 'name must be at least 5 character'],
        maxLength: [50, 'name must be less than 50 character'],
        trim:true // timp --> starting and end  space remove 
    },
    email:{
        type:String,
        required: [true, 'user email is required'],
        unique: true,
        lowercase: true,
        unique: [true, 'already registered'],
    },
    password:{
        type:String,
        select: false,
    },
    forgotPasswordToken:{
        type:String,
        
    },
    forgotPasswordExpiryDate:{
        type:Date
    }
},
{
    //Bydefault time stamp 
    timestamps: true
})


//modlel 
const userModel = mongoose.model('user', userSchema); //databse collection name is users 
module.exports = userModel;