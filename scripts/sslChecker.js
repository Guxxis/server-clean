import sslChecker from 'ssl-checker';
import { domain } from '../src/models/Domain.js';
import pLimit from 'p-limit';

const limit = pLimit(12);

async function checkSSL(domainObj) {
    const domainRoot = domainObj.server_domain;

    try {
        const res = await sslChecker(domainRoot);
        const sslDays = res.daysRemaining;
        const sslValid = res.validTo;
        const sslFor = res.validFor;

        await domain.updateOne(
            { server_domain: domainRoot },
            {
                $set: {
                    ssl_days: sslDays,
                    ssl_expirate: sslValid,
                    ssl_validFor: sslFor
                }
            }
        );
        return { domainRoot, status: 'ok' };

    } catch (err) {
        await domain.updateOne(
            { server_domain: domainRoot },
            { $set: { ssl_days: 0 } }
        );

        return { domainRoot, status: 'erro', erro: err.message };
    }
};

async function sslResolve() {

    console.time('SSL Checker');
    console.log(`SSL Checker > Iniciado`);

    const domains = await domain.find({});

    console.log(`Validando o Certificado SSL dos dominios...`);
    const sslPromises = domains.map(domain => limit(() => checkSSL(domain)));
    const results = await Promise.all(sslPromises);

    const totalOK = results.filter(r => r.status === 'ok').length;
    const totalErro = results.filter(r => r.status === 'erro').length;

    console.log(`✅ Atualizados: ${totalOK}`);
    console.log(`❌ Falhas: ${totalErro}`);

    console.timeEnd('SSL Checker');
}

export default sslResolve;