const dns = require('node:dns').promises;
// const database = require('../src/config/database.js');
const Domain = require('../src/models/Domain.js');
// const dotenv = require('dotenv');

// dotenv.config();

async function dnsResolver() {

    console.time('DNS Resolver');
    console.log(`DNS Resolver > Iniciado`);
    // database.connectDB();
    
    const domains = await Domain.find({});
    const dnsResolved = [];
    
    console.log(`Buscando DNS dos dominios...`);
    for (const item of domains) {
        const domain = item.server_domain;

        try {

            const res = await dns.lookup(domain);
            const ipv4 = res.address;

            await Domain.updateOne(
                { server_domain: domain },
                { $set: { production_ip: ipv4 } }
            );

            dnsResolved.push(res);

        } catch (err) {
            await Domain.updateOne(
                { server_domain: domain },
                { $set: { production_ip: 'Falha ao resolver' } }
            );
        }
    }

    console.log(`Total Atualizado: ${dnsResolved.length}`);
    console.timeEnd('DNS Resolver');
    // database.disconnectDB();

}

module.exports = dnsResolver;