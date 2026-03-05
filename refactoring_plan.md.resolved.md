# Plano de Refatoração: Project Server-Clean

Este documento descreve a estratégia para migrar o banco de dados de MongoDB para PostgreSQL, integrar a busca de expiração de domínios e implementar a nova rota POST.

## 1. Infraestrutura e Preparação
- [ ] Instalar dependências para PostgreSQL e ORM (Recomendado: `sequelize` e `pg`).
- [ ] Configurar conexão com PostgreSQL em `config/database.js`.
- [ ] Definir o novo Schema/Model para PostgreSQL.

## 2. Modelagem de Dados (PostgreSQL)
- [ ] Criar a tabela `domains` no PostgreSQL com os campos atuais do MongoDB.
- [ ] **Novo campo:** Adicionar `domain_expiration` (DATE) à tabela.
- [ ] Criar scripts de migração (se estiver usando um ORM com suporte a migrations).

## 3. Implementação de Novas Funcionalidades
- [ ] **Busca de Expiração:** Criar um serviço ou utility que utilize bibliotecas como `whois` ou APIs externas para verificar a data de expiração do domínio.
- [ ] **Rota POST `/domains`:**
    - [ ] Criar endpoint no [domainRoutes.js](file:///c:/Users/gustavo.goncalves/projetos/workspace/repositorys/server-clean/src/routes/domainRoutes.js).
    - [ ] Implementar lógica no `domainController.js` para:
        - Receber o domínio.
        - Trigger de buscas automáticas (SSL, IP atual, Expiração do Domínio).
        - Salvar os resultados no PostgreSQL.

## 4. Migração de Dados
- [ ] Criar um script temporário para ler todos os dados do MongoDB Atlas e inseri-los no PostgreSQL.
- [ ] Validar a integridade dos dados migrados.

## 5. Refatoração dos Controllers e Services
- [ ] Atualizar todos os métodos no `domainController.js` para utilizarem o novo model do PostgreSQL.
- [ ] Adaptar queries de busca e filtros (ex: `dominiosSslExpirando`, `dominiosPoteOuro`) para a sintaxe do novo ORM/SQL.

## 6. Finalização e Limpeza
- [ ] Alterar o [src/app.js](file:///c:/Users/gustavo.goncalves/projetos/workspace/repositorys/server-clean/src/app.js) para inicializar a conexão com o PostgreSQL em vez do MongoDB.
- [ ] Remover dependências do Mongoose e MongoDB do [package.json](file:///c:/Users/gustavo.goncalves/projetos/workspace/repositorys/server-clean/package.json).
- [ ] Validar documentação Swagger com as novas rotas e campos.

---

> [!TIP]
> Durante a migração, mantenha ambos os bancos configurados no [.env](file:///c:/Users/gustavo.goncalves/projetos/workspace/repositorys/server-clean/.env) para facilitar o script de migração de dados.
