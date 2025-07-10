// utils/saveDomains.js
const Domain = require('../src/models/Domain.js');

async function saveDomainsToMongo(paths = [], server_ip) {
  const insertPromises = [];

  for (const path of paths) {
    const parts = path.split('/');
    
    if (parts.length < 5) continue; // proteção contra erros

    const server_user = parts[2]; // /home/user/web/domain
    const server_domain = parts[4];

    const doc = {
      server_user,
      server_domain,
      server_ip,
      server_suspended: false,
      // os outros campos ficarão nulos por padrão
    };

    insertPromises.push(
      Domain.updateOne(
        { server_domain }, // evita duplicidade
        { $set: doc },
        { upsert: true }
      )
    );
  }

  await Promise.all(insertPromises);
  console.log(`${insertPromises.length} domínios inseridos ou atualizados com sucesso.`);
}

module.exports = {saveDomainsToMongo};
