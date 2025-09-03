import { domain } from '../src/models/Domain.js';
import axios from 'axios';
import pLimit from 'p-limit';

const limit = pLimit(10);

async function checkSuspension(domainDoc) {
    const domainRoot = domainDoc.server_domain;

    const suspended = await axios.get(`https://www.${domainRoot}`)
        .then(response => {
            const isSuspended = typeof response.data === 'string' && response.data.toUpperCase().includes('SUSPENDED');
            return isSuspended;
        })
        .catch(erro => {
            const statusCode = erro.status;
            const isSuspended = statusCode === 302 ? true : false;
            if(isSuspended){console.log(domainRoot + " - Status: " + statusCode)}
            return isSuspended;
        });


    await domain.updateOne(
        { server_domain: domainRoot },
        { $set: { server_suspended: suspended } }
    );

}

async function suspensionChecker() {
    console.time('🕙 Suspended Process');
    console.log('🔍 Iniciando verificação de suspensão dos domínios...');

    const domains = await domain.find({}, 'server_domain');

    const tasks = domains.map(d => limit(() => checkSuspension(d)));
    await Promise.all(tasks);

    console.timeEnd('🕙 Suspended Process');
}

export default suspensionChecker;