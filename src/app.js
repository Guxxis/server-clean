const express = require('express');
const dotenv = require('dotenv');
const database = require('./config/database.js');
const routes = require('./routes/index.js');

dotenv.config();
database.connectDB();

const app = express();
routes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT,() =>{
    console.log(`Servidor rodando na porta ${PORT}`);
});