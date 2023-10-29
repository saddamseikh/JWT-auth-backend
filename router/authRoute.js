const express = require('express'); // express require 
const { signup } = require('../controller/authController');
const authRouter = express.Router(); // Router instance 

//post controller  create beacuse enitity create 
// '/signup' --> path & ,signup --> controller 
authRouter.post('/signup', signup);

module.exports = authRouter;