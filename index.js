require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');

const server = http.createServer(app);

mongoose
   .connect(config.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true})
   .then(connected => {
      return server.listen(config.port);
   })
   .then(() => {
      console.log(`connection successful at port ${config.port}`);
   })
   .catch((err) => {
      console.log('connection to the database failed!', err)
   })

