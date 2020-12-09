const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();

//import routes
const shopRoutes = require('./routes/shop');

//register middlewares
//app.use(cors());


//render to frontend
app.use('/api', shopRoutes);

//handle errors
app.use((errors, req, res, next) => {
    res.json(errors)
})


module.exports = app;