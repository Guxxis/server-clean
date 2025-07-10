const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function connectDB() {
    try {
        // await mongoose.connect(process.env.MONGO_URI, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // });
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Atlas conectado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao conectar no MongoDB:', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;