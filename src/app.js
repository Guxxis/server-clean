import express from 'express';
import database from '../config/database.js';
import routes from './routes/index.js';
import 'dotenv/config';

database.connectDB();

const app = express();
routes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT,() =>{
    console.log(`Servidor rodando na porta ${PORT}`);
});