// serverScanner.js
const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

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

module.exports = { scanServer };
