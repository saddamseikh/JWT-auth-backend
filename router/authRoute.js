const express = require('express'); // express require 
const { signup,signin,getUser,logout } = require('../controller/authController');
const jwtAuth = require('../middleware/jwtAuth');
const authRouter = express.Router(); // Router instance 

//post controller  create beacuse enitity create 
// '/signup' --> path & ,signup --> controller 
authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.get('/user',jwtAuth,getUser);
authRouter.get('/logout' ,jwtAuth, logout)


module.exports = authRouter;