const database = require('../src/config/database.js');
const Domain = require('../src/models/Domain.js');
const dotenv = require('dotenv');
const { getActiveCustomers } = require('../src/utils/crmConnector.js')

dotenv.config();

async function main() {

    console.log(`CRM Enricher > Iniciado`);

    console.log(`Buscando Clientes...`);
    const customers = await getActiveCustomers();
    console.log(`Total de clientes ativos encontrados: ${customers.length}`);
    
    
    database.connectDB();
    
    console.log(`Atualizando dominios com CRM...`);
    for (const customer of customers) {
        const domain = customer.custom_fields.dominio?.value || 'Vazio';
        const rootDomain = domain.replace(/^www\./, '');
        
        const senseServer = customer.custom_fields.servidor_hospedado?.value || 'Vazio';
        const senseIp = Array.isArray(senseServer) ? senseServer[0] : senseServer;
        
        try {
            await Domain.updateOne(
                { server_domain: rootDomain },
                {
                    $set: {
                        sense_status: true,
                        sense_id: customer.id_legacy,
                        sense_contract: customer.name_contract,
                        sense_ip: senseIp,
                        sense_stage: customer.stage
                    }
                },
                { upsert: false }
            );
            
        } catch (erro) {
            console.log(`Falha ao atualizar dominio > ${rootDomain}`);
        }
        
    }
    
    database.disconnectDB();
    console.log(`CRM Enricher > Finalizado`);
    
}

main()