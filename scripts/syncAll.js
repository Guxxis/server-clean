import fetchDomains from './serverScanner.js';
import fetchCRM from './crmEnricher.js';
import fetchSuspended from './suspensionChecker.js';
import updateDNS from './dnsResolver.js';
import updateSSL from './sslChecker.js';
import database from '../config/database.js';
import "dotenv/config";

async function syncAll() {
    console.time('Sync All Process');
    database.connectDB();
    try {

        await fetchDomains();
        await Promise.all([
            fetchCRM(),
            updateDNS(),
            updateSSL(),
            fetchSuspended()
        ]);

        console.log('Sincronização realizada com sucesso')
    } catch (erro) {
        console.log('Erro durante processo: ', erro)
    }
    console.timeEnd('Sync All Process');
    database.disconnectDB();
}

syncAll();