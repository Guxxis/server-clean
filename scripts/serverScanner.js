const { saveDomainsToMongo } = require('../src/utils/saveDomains.js');
const database = require('../src/config/database.js');
const Domain = require('../src/models/Domain.js');
const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

require('dotenv').config();

async function scanServer(serverConfig) {
  try {
    await ssh.connect({
      host: serverConfig.host,
      username: serverConfig.username,
      password: serverConfig.password,
      port: serverConfig.port || 22
    });

    console.log(`Conectado ao servidor ${serverConfig.ip}`);

    const command = 'ls -d /home/*/web/*';
    const result = await ssh.execCommand(command);

    if (result.stderr) {
      console.error(`Erro ao executar comando no servidor: ${result.stderr}`);
      return [];
    }

    const domínios = result.stdout
      .split('\n')
      .map(linha => linha.trim())
      .filter(Boolean);

    // console.log(`Domínios encontrados em ${serverConfig.host}:`, domínios);

    ssh.dispose(); // desconecta

    return domínios;
  } catch (error) {
    console.error(`Erro ao conectar no servidor ${serverConfig.host}:`, error);
    return [];
  }
}

const servidoresTeste = [
    {
        ip: '169.57.141.90',
        host: '10.151.13.113',
        username: 'admin',
        password: 'lX^SSOiI#vXZ'
    }
];

async function main() {
  database.connectDB();

  await Domain.deleteMany({})
  console.log(`Limpando o banco de dados...`);

  for (const server of servidoresTeste) {
    const dominios = await scanServer(server);

    await saveDomainsToMongo(dominios, server.ip);
  }
  database.disconnectDB();
};

main();