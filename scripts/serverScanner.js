import saveDomains from '../src/services/saveDomains.js';
import { domain } from '../src/models/Domain.js';
import { NodeSSH } from 'node-ssh';
import servers from '../src/utils/servers.json' assert { type: 'json'};

const ssh = new NodeSSH();

async function scanServer(serverConfig) {
  try {
    await ssh.connect({
      host: serverConfig.host,
      username: serverConfig.username,
      password: serverConfig.password,
      port: serverConfig.port || 22
    });

    const command = 'ls -d /home/*/web/*';
    const result = await ssh.execCommand(command);

    if (result.stderr) {
      console.error(`❗ Erro ao executar comando no servidor: ${result.stderr}`);
      return [];
    }

    const domínios = result.stdout
      .split('\n')
      .map(linha => linha.trim())
      .filter(Boolean);

    ssh.dispose();

    return domínios;
  } catch (error) {
    console.error(`❗ Erro ao conectar no servidor ${serverConfig.host}:`, error);
    return [];
  }
}

async function serverScanner() {
  console.time('🕙 Server Scanner Process');
  console.log(`💣 Limpando banco de dados...`);
  await domain.deleteMany({})

  console.log(`🔍 Scaneando os servidores...`);
  for (const server of servers) {
    const dominios = await scanServer(server);
    await saveDomains(dominios, server.ip);
  }
  console.timeEnd('🕙 Server Scanner Process');
};

export default serverScanner;