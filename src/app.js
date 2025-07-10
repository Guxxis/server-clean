const express = require('express');
const connectDB = require('./config/database.js');
const routes = require('./routes/index.js');

require('dotenv').config();

connectDB();

const app = express();
routes(app);

module.exports = app;