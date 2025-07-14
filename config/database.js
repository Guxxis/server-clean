import mongoose from 'mongoose';

class MongoConnection {

    static async connectDB() {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log('✅ MongoDB Atlas conectado com sucesso!');
        } catch (error) {
            console.error('❌ Erro ao conectar no MongoDB:', error.message);
            process.exit(1);
        }
    };

    static async disconnectDB() {
        try {
            await mongoose.disconnect();
            console.log('✅ MongoDB Atlas desconectado com sucesso!');
        } catch (erro) {
            console.error('❌ Erro ao desconectar do MongoDB: ', error.message);
            process.exit(1);
        }
    }

}

export default MongoConnection;