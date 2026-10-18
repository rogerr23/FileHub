# FileHub

API REST para gerenciamento de usuários e arquivos, criada para estudar backend com NestJS, TypeScript e AWS.

O projeto está na etapa inicial: estrutura modular, Swagger e endpoint de saúde. As funcionalidades de usuários e arquivos serão implementadas nas próximas etapas.

## Executar

Requisitos: Node.js 22.14.0 e npm.

```bash
npm ci
cp .env.example .env
npm run start:dev
```

Se o `.env` já existir, mantenha o arquivo atual. A API inicia em `http://127.0.0.1:3000`.

**Use apenas localmente ou em testes com acesso restrito enquanto não houver autenticação.**

## Testar

```bash
curl http://127.0.0.1:3000/health
```

Resposta esperada: HTTP 200 com `{"status":"ok"}`.

Documentação dos endpoints: [Swagger](http://127.0.0.1:3000/docs).

Para executar os testes automatizados:

```bash
npm test
npm run test:e2e
```

Detalhes sobre estrutura, configuração e verificações estão em [docs/development.md](docs/development.md).
