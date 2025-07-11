const sslChecker = require('ssl-checker');
const database = require('../src/config/database.js');
const Domain = require('../src/models/Domain.js');
const dotenv = require('dotenv');

dotenv.config();

async function main() {

    database.connectDB();

    const domains = await Domain.find({});
    const sslChecked = [];

    for (const item of domains) {
        const domain = item.server_domain;

        try {

            const res = await sslChecker(domain);
            const sslValid = res.daysRemaining;

            await Domain.updateOne(
                { server_domain: domain },
                { $set: { ssl_days: sslValid } }
            );

            sslChecked.push(res);

        } catch (err) {
            console.log(`❌ Falha ao resolver ${domain}`);
            await Domain.updateOne(
                { server_domain: domain },
                { $set: { production_ip: 'Falha ao resolver' } }
            );
        }
    }

    console.log(`Total Atualizado: ${sslChecked.length}`);

    database.disconnectDB();

}

main()