const { scanServer } = require('./serverScanner');
require('dotenv').config();

const servidores = [
  {
    host: '185.239.210.188',
    username: 'u244644731',
    password: 'UA5Hywsn&FU3kN#',
    port: 65002
  }
];

(async () => {
  for (const server of servidores) {
    const dominios = await scanServer(server);
  }
})();