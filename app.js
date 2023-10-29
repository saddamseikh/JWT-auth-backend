const express = require('express');

const app = express(); // express instance create 
//basic route create 
app.use('/', (req, res)=>{
    res.status(200).json({data:'JWT_server-server'});
})

module.exports = app;