const { scanServer } = require('./serverScanner');
const { saveDomainsToMongo} = require('./utils/saveDomains.js');
const connectDB = require('./src/config/database.js');
require('dotenv').config();

const servidores = [
    {
        host: '185.239.210.188',
        username: 'u244644731',
        password: 'UA5Hywsn&FU3kN#',
        port: 65002
    }
];

async function main() {
    for (const server of servidores) {
        // const dominios = await scanServer(server);
        connectDB();

        const paths = [
            "/home/user1/web/site1.com",
            "/home/user2/web/site2.com"
        ];

        await saveDomainsToMongo(paths, server.host);
    }
};

main();