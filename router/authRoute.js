const express = require('express'); // express require 
const { signup,signin,getUser } = require('../controller/authController');
const jwtAuth = require('../middleware/jwtAuth');
const authRouter = express.Router(); // Router instance 

//post controller  create beacuse enitity create 
// '/signup' --> path & ,signup --> controller 
authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.get('/user',jwtAuth,getUser);


module.exports = authRouter;