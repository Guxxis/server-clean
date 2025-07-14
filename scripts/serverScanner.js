import saveDomains from '../src/services/saveDomains.js';
import { domain } from '../src/models/Domain.js';
import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function scanServer(serverConfig) {
  try {
    await ssh.connect({
      host: serverConfig.host,
      username: serverConfig.username,
      password: serverConfig.password,
      port: serverConfig.port || 22
    });

    console.log(`Conectado ao servidor > ${serverConfig.ip}`);

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

    ssh.dispose();

    return domínios;
  } catch (error) {
    console.error(`Erro ao conectar no servidor ${serverConfig.host}:`, error);
    return [];
  }
}

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

async function serverScanner() {
  console.time('Server Scanner');
  console.log(`Server Scanner > Iniciado`);
  console.log(`Limpando dados do banco...`);
  await domain.deleteMany({})

  console.log(`Scaneando os servidores...`);
  for (const server of servidores) {
    const dominios = await scanServer(server);
    await saveDomains(dominios, server.ip);
  }
  console.timeEnd('Server Scanner');
};

export default serverScanner;