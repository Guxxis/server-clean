const { scanServer } = require('./serverScanner');
const { saveDomainsToMongo } = require('./utils/saveDomains.js');
const connectDB = require('./src/config/database.js');
const Domain = require('./src/models/Domain.js');
const mongoose = require('mongoose');
require('dotenv').config();

const servidores = [
  {
    ip: '169.57.141.90',
    host: '10.151.13.113',
    username: 'admin',
    password: 'lX^SSOiI#vXZ'
  },
  {
    ip: '169.57.169.70',
    host: '10.151.13.73',
    username: 'admin',
    password: '!eGcRzX^&SQy'
  },
  {
    ip: '169.57.169.72',
    host: '10.151.13.95',
    username: 'admin',
    password: 'rk*6jF5E%Kj@'
  },
  {
    ip: '169.57.141.85',
    host: '10.151.13.112',
    username: 'admin',
    password: 'C9xejuL#7%5D'
  },
  {
    ip: '169.57.169.85',
    host: '10.151.13.83',
    username: 'admin',
    password: 'pD4O&WMtCfB&'
  },
  {
    ip: '169.57.169.91',
    host: '10.151.13.109',
    username: 'admin',
    password: 'tZBfsXdR^wE&'
  },
  {
    ip: '169.57.141.94',
    host: '10.151.13.89',
    username: 'admin',
    password: '62OnBDcbYB'
  },
  {
    ip: '169.57.169.74',
    host: '10.151.13.80',
    username: 'admin',
    password: 'vURN1MCLmJ'
  },
  {
    ip: '169.57.169.83',
    host: '10.151.13.105',
    username: 'admin',
    password: 'j7w2rmVYXC'
  },
  {
    ip: '169.57.169.77',
    host: '10.151.13.120',
    username: 'admin',
    password: 'CtLDu8P38Q'
  },
  {
    ip: '169.57.169.73',
    host: '10.151.13.110',
    username: 'admin',
    password: 'b@ZaW$z@yzBX'
  }
];

const servidoresTeste = [
  {
    ip: '169.57.141.90',
    host: '10.151.13.113',
    username: 'admin',
    password: 'lX^SSOiI#vXZ'
  }
];

async function main() {
  connectDB();

  await Domain.deleteMany({})
  console.log(`Limpando o banco de dados...`);

  for (const server of servidores) {
    const dominios = await scanServer(server);

    await saveDomainsToMongo(dominios, server.ip);
  }
  mongoose.disconnect();
};

main();