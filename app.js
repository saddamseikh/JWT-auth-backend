const express = require('express');
const { signup } = require('./controller/authController');
const authRouter = require('./router/authRoute.js')
const app = express(); // express instance create 

app.use(express.json())
app.use('/api/auth/',authRouter)
//basic route create 
app.use('/', (req, res)=>{
    res.status(200).json({data:'JWT_server-server'});
})

module.exports = app;