import axios from 'axios';
import { response } from 'express';

async function checkSuspension(domainDoc) {
    const domainRoot = domainDoc;

    const suspended = await axios.get(`https://www.${domainRoot}`)
        .then(response => {
            const statusCode = response.status;
            const isSuspended = typeof response.data === 'string' && response.data.toUpperCase().includes('SUSPENDED');
            return isSuspended;
        })
        .catch(erro => {
            const statusCode = erro.status;
            const isSuspended = statusCode === 302 ? true : false;
            return isSuspended;
        });

        console.log(suspended)
}

checkSuspension('pratikmedical.com.br');
checkSuspension('niposantoamaro.com.br');