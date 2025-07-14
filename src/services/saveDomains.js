import { domain } from '../models/Domain.js';

const fileIgnore = ['contato', 'old', 'tmp', 'public_html', 'backamerican', 'teste', 'pplinetestadmin'];
const extIgnore = ['.tar.gz', '.php', '.sh', '.txt', '.sql'];

async function saveDomainsToMongo(paths = [], server_ip) {
  const insertPromises = [];

  for (const path of paths) {
    const parts = path.split('/');

    if (parts.length < 5) continue;

    const server_user = parts[2];
    const server_domain = parts[4];

    if (fileIgnore.includes(server_domain)) continue;
    if (extIgnore.some(ext => server_domain.endsWith(ext))) continue;

    const doc = {
      server_user,
      server_domain,
      server_ip,
      server_suspended: false,
    };

    insertPromises.push(domain.insertOne(doc));
  }

  await Promise.all(insertPromises);
  console.log(`💾 Servidor ${server_ip} - salvos: ${insertPromises.length} domínios`);
}

export default saveDomainsToMongo;
