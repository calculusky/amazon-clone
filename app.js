const path = require('path');
const express = require('express');
const app = express();

//import routes
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

//register middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//render to frontend
app.use('/api', shopRoutes);
app.use('/api', authRoutes);

//handle errors
app.use((error, req, res, next) => {
    console.log(error.message, 'application error')
    const status = error.status || 500;
    const message = error.message;
    res.status(status).json({ message: message, status: status })
})


module.exports = app;