const express = require('express');
const authRouter = require('./router/authRoute.js');
const databaseconnect = require('./config/databaseConfig');
const app = express(); // express instance create 
const cookieParser = require('cookie-parser')

//database connect 
databaseconnect();

app.use(express.json())
app.use(cookieParser());
app.use('/api/auth/',authRouter)
//basic route create 
app.use('/', (req, res)=>{
    res.status(200).json({data:'JWT_server-server'});
})

module.exports = app;