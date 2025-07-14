import { domain } from '../src/models/Domain.js';
import axios from 'axios';
import pLimit from 'p-limit';

const limit = pLimit(10);

async function checkSuspension(domainDoc) {
    const domainRoot = domainDoc.server_domain;

    try {
        const { data } = await axios.get(`http://${domainRoot}`, { timeout: 2000 });
        const isSuspended = typeof data === 'string' && data.toUpperCase().includes('SUSPENDED');

        await domain.updateOne(
            { server_domain: domainRoot },
            { $set: { server_suspended: isSuspended } }
        );
    } catch (err) {
        await domain.updateOne(
            { server_domain: domainRoot },
            { $set: { server_suspended: false } }
        );
    }
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