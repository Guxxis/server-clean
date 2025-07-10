const mongoose = require('mongoose');

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Atlas conectado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao conectar no MongoDB:', error.message);
        process.exit(1);
    }
}

exports.disconnectDB = async () => {
    try {
        await mongoose.disconnect();
    } catch (erro) {
        console.error('❌ Erro ao desconectar do MongoDB: ', error.message);
        process.exit(1);
    }

}


// async function connectDB() {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log('✅ MongoDB Atlas conectado com sucesso!');
//     } catch (error) {
//         console.error('❌ Erro ao conectar no MongoDB:', error.message);
//         process.exit(1);
//     }
// }

// module.exports = connectDB;