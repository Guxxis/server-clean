import {promises as dns} from 'node:dns';
import { domain } from '../src/models/Domain.js';
import pLimit from 'p-limit';

const limit = pLimit(12);

async function checkDNS(domainObj) {
    const domainRoot = domainObj.server_domain;

    try {
        const res = await dns.lookup(domainRoot);
        const ipv4 = res.address;

        await domain.updateOne(
            { server_domain: domainRoot },
            { $set: { production_ip: ipv4 } }
        );

        return { domainRoot, status: 'ok' };

    } catch (err) {
        await domain.updateOne(
            { server_domain: domainRoot },
            { $set: { production_ip: 'Falha ao resolver' } }
        );
        return { domainRoot, status: 'erro', erro: err.message };
    }
}

async function dnsResolver() {

    console.time('🕙 DNS Process');

    const domains = await domain.find({});

    console.log(`🔍 Buscando DNS dos dominios...`);

    const sslPromises = domains.map(domain => limit(() => checkDNS(domain)));
    const results = await Promise.all(sslPromises);

    const totalOK = results.filter(r => r.status === 'ok').length;
    const totalErro = results.filter(r => r.status === 'erro').length;

    console.log(`✅ Atualizados: ${totalOK} | ❌ Falhas: ${totalErro}`);

    console.timeEnd('🕙 DNS Process');

}

export default dnsResolver;