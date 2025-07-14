import fetchDomains from './serverScanner.js';
import fetchCRM from './crmEnricher.js';
import fetchSuspended from './suspensionChecker.js';
import updateDNS from './dnsResolver.js';
import updateSSL from './sslChecker.js';
import database from '../config/database.js';
import "dotenv/config";

async function syncAll() {
    console.time('🕙 Server Clean Scanner Process');
    console.log('😐 Server Clean Scanner processos iniciados, aguarde até finalização...')
    database.connectDB();
    try {
        
        await fetchDomains();
        console.log('😌 Novo banco de dados criado com sucesso!')
        console.log('😪 Aguarde o banco ser alimentado com outras informações...')
        await Promise.all([
            fetchCRM(),
            updateDNS(),
            updateSSL(),
            fetchSuspended()
        ]);

        console.log('😆 Server Clean Scanner processado com sucesso!!')
    } catch (erro) {
        console.log('❗ Erro durante processo: ', erro)
    }
    console.timeEnd('🕙 Server Clean Scanner Process');
    database.disconnectDB();
}

syncAll();