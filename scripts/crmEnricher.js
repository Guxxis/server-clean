const database = require('../src/config/database.js');
const Domain = require('../src/models/Domain.js');
const dotenv = require('dotenv');
const { getActiveCustomers } = require('../src/utils/crmConnector.js')

dotenv.config();

async function main() {

    database.connectDB();

    const customers = await getActiveCustomers();
    for (const customer of customers) {
        const domain = customer.custom_fields.dominio?.value || 'Vazio';
        const rootDomain = domain.replace(/^www\./, '');

        await Domain.updateOne(
            { server_domain: rootDomain },
            {
                $set: {
                    sense_status: true,
                    sense_id: customer.id_legacy,
                    sense_contract: customer.name_contract,
                    sense_ip: customer.custom_fields.servidor_hospedado?.value || 'Vazio',
                    sense_stage: customer.stage
                }
            },
            { upsert: false }
        );

    }

    database.disconnectDB();

}

main()