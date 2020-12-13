const path = require('path');
const express = require('express');
const app = express();

//import routes
const shopRoutes = require('./routes/shop');

//register middlewares


//render to frontend
app.use('/api', shopRoutes);

//handle errors
app.use((errors, req, res, next) => {
    console.log(errors.message)
    res.status(404).json({ message: errors.message })
})


module.exports = app;