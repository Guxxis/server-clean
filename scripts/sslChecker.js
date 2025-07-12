const sslChecker = require('ssl-checker');
const database = require('../src/config/database.js');
const Domain = require('../src/models/Domain.js');
const dotenv = require('dotenv');

dotenv.config();

async function main() {

    console.log(`SSL Checker > Iniciado`);
    database.connectDB();

    const domains = await Domain.find({});
    const sslChecked = [];

    console.log(`Validando o Certificado SSL dos dominios...`);
    for (const item of domains) {
        const domain = item.server_domain;

        try {

            const res = await sslChecker(domain);
            const sslDays = res.daysRemaining;
            const sslValid = res.daysRemaining;
            const sslFor = res.daysRemaining;

            await Domain.updateOne(
                { server_domain: domain },
                {
                    $set: {
                        ssl_days: sslDays,
                        ssl_expirate: sslValid,
                        ssl_validFor: sslFor
                    }
                }
            );

            sslChecked.push(res);

        } catch (err) {
            await Domain.updateOne(
                { server_domain: domain },
                { $set: { ssl_days: 'Falha ao resolver' } }
            );
        }
    }

    console.log(`Total Atualizado: ${sslChecked.length}`);

    database.disconnectDB();

}

main()