const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();

//import routes
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

//register middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//render to frontend
app.use('/api', shopRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);

//handle errors
app.use((error, req, res, next) => {
    console.log(error.message, 'application error')
    const status = error.status || 500;
    const message = error.message;
    res.status(status).json({ message: message, status: status })
})


module.exports = app;