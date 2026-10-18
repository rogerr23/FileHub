# Desenvolvimento

## Estrutura

O projeto segue a organização modular padrão do NestJS. Controllers recebem requisições HTTP, services concentram o comportamento e módulos registram as dependências.

| Módulo       | Responsabilidade                                        |
| ------------ | ------------------------------------------------------- |
| AppModule    | Reunir a configuração e os módulos da aplicação         |
| UsersModule  | Futuro cadastro e listagem de usuários                  |
| FilesModule  | Futuros uploads, listagem e downloads de arquivos       |
| HealthModule | Disponibilizar `GET /health`                            |
| ConfigModule | Carregar variáveis de ambiente e validar a configuração |

Users e Files possuem controllers e services registrados, ainda sem rotas ou regras de negócio. Por isso, `/users` e `/files` retornam 404.

`src/main.ts` inicializa o servidor. `src/setup.ts` configura Swagger e validação global, tanto na aplicação quanto nos testes HTTP.

A `ValidationPipe` está pronta para validar futuros DTOs de entrada e rejeitar campos desconhecidos. O health não recebe dados; seu DTO de resposta descreve o contrato no Swagger, sem validar a saída em tempo de execução.

O health verifica apenas se a API responde. Não há banco de dados ou serviços externos nesta etapa.

## Configuração

O `.env` é opcional: os valores padrão são os mesmos de `.env.example`. Variáveis definidas no terminal têm prioridade sobre o arquivo.

| Variável | Padrão      | Finalidade                                 |
| -------- | ----------- | ------------------------------------------ |
| `HOST`   | `127.0.0.1` | Interface de rede do servidor              |
| `PORT`   | `3000`      | Porta HTTP, número inteiro entre 1 e 65535 |

Configurações inválidas impedem a inicialização. Mantenha o acesso local ou restrito enquanto não houver autenticação. Se alterar a porta, ajuste as URLs usadas para acessar a API e o Swagger.

A versão de Node usada no projeto está em `.nvmrc`. Se usar nvm, execute `nvm use` antes de instalar as dependências.

## Comandos

```bash
npm run build          # Compila a aplicação
npm run start:prod     # Executa o JavaScript compilado
npm run typecheck      # Verifica os tipos de src e test
npm run lint           # Executa a análise estática
npm run format:check   # Verifica a formatação do código e dos arquivos da raiz
npm run format         # Aplica a formatação nesses arquivos
npm test               # Testes unitários de configuração
npm run test:e2e       # Testes HTTP de health, Swagger e escopo atual
```

Os testes HTTP inicializam a aplicação automaticamente. Não é necessário iniciar o servidor antes. Para parar o servidor em desenvolvimento, pressione `Ctrl+C`.

`start:prod` executa o código compilado; as restrições de acesso desta etapa continuam valendo.

Para conferir a formatação dos documentos desta pasta, execute `npx --no-install prettier --check 'docs/**/*.md'`.

## Swagger

A interface está em `/docs` e o documento OpenAPI JSON em `/docs-json`. Para testar pelo Swagger, expanda `GET /health`, clique em **Try it out** e depois **Execute**.

## Dependências

O `package.json` inclui um override de `js-yaml` para o Swagger porque a versão fixada pela biblioteca apresenta alertas de segurança.

Na verificação da etapa inicial, `npm audit --omit=dev` não encontrou vulnerabilidades nas dependências da API. A auditoria completa apontou 20 alertas moderados na cadeia de ferramentas de teste do Jest/ts-jest, originados em `sprintf-js`. O resultado pode mudar conforme novos avisos forem publicados.

## Próxima etapa sugerida

Configurar PostgreSQL com Prisma e implementar cadastro e listagem de usuários com DTOs, validação e testes, quando solicitado. Depois, evoluir para arquivos e serviços AWS.

As orientações para alterações no projeto estão em [AGENTS.md](../AGENTS.md).
