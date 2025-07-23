import express from 'express';
import database from '../config/database.js';
import routes from './routes/index.js';
import 'dotenv/config';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

database.connectDB();

routes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT,() =>{
    console.log(`Servidor rodando na porta ${PORT}`);
});