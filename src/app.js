const express = require('express');
const connectDB = require('./config/database.js');
const routes = require('./routes/index.js');

require('dotenv').config();

connectDB();

const app = express();
routes(app);

const PORT = 3000;

app.listen(PORT,() =>{
    console.log(`Servidor rodando na porta ${PORT}`);
});

// module.exports = app;