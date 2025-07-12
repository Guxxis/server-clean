const fetchDomains = require('./serverScanner.js');
const fetchCRM = require('./crmEnricher.js');
const updateDNS = require('./dnsResolver.js');
const updateSSL = require('./sslChecker.js');
require('dotenv').config();
const database = require('../src/config/database.js');

async function syncAll() {
    console.time('Sync All Process');
    database.connectDB();
    try {

        await fetchDomains();
        await fetchCRM();
        await updateDNS();
        await updateSSL();

        console.log('Sincronização realizada com sucesso')
    } catch (erro) {
        console.log('Erro durante processo: ', erro)
    }
    console.timeEnd('Sync All Process');
    database.disconnectDB();
}

syncAll();