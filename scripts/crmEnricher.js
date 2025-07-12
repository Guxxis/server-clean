import { domain } from '../src/models/Domain.js';
import getCustomers from '../src/utils/crmConnector.js';

async function crmEnricher() {

    console.time('CRM Enricher');
    console.log(`CRM Enricher > Iniciado`);

    console.log(`Buscando Clientes...`);
    const customers = await getCustomers();
    console.log(`Total de clientes ativos encontrados: ${customers.length}`);

    console.log(`Atualizando dominios com CRM...`);
    for (const customer of customers) {
        const crmDomain = customer.custom_fields.dominio?.value || '';
        const rootDomain = crmDomain.replace(/^www\./, '');

        const senseServer = customer.custom_fields.servidor_hospedado?.value || '';
        const senseIp = Array.isArray(senseServer) ? senseServer[0] : senseServer;

        try {
            await domain.updateOne(
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
    console.timeEnd('CRM Enricher')
}

export default crmEnricher;