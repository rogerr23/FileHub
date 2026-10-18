# Orientações do FileHub

## Objetivo

API REST de estudo de backend com NestJS e TypeScript, evoluindo futuramente para serviços AWS. Priorize código simples e explicações breves das decisões técnicas.

## Desenvolvimento por etapas

- Implemente somente a etapa solicitada pelo usuário.
- A etapa inicial contém a base NestJS, módulos Users e Files, Swagger e `GET /health`.
- Nesta etapa, não implemente cadastro, listagem, upload, download, autenticação, PostgreSQL, Prisma, Docker ou AWS.
- PostgreSQL, Prisma, Docker Compose, S3, IAM, EC2, RDS e CloudWatch fazem parte de etapas futuras.

## Arquitetura e código

- Siga a arquitetura modular padrão do NestJS, com módulos por funcionalidade.
- Controllers recebem requisições HTTP; services concentram regras de negócio; modules registram controllers e providers.
- Use nomes de classes, métodos, propriedades e arquivos em inglês. Escreva documentação e explicações em português.
- Use TypeScript com verificação estrita e injeção de dependências do NestJS.
- Não use microsserviços, Clean Architecture, CQRS, repositórios genéricos ou abstrações sem necessidade.
- Use DTOs e `class-validator` quando houver entrada de dados. A validação global está configurada em `src/setup.ts`.
- Documente cada novo endpoint e seus DTOs com Swagger.
- Configure a aplicação por variáveis de ambiente e mantenha `.env.example` atualizado. Nunca versione `.env` ou segredos.
- Mantenha o bind padrão em `127.0.0.1`. Enquanto não houver autenticação, use apenas ambiente local ou testes com acesso restrito.
- O health check atual indica apenas que a aplicação responde; não verifica banco de dados ou serviços externos.

## Verificações

- Use npm e mantenha `package-lock.json` sincronizado com `package.json`.
- Execute `npm run build`, `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm test` e `npm run test:e2e` ao alterar a base.
- Adicione testes úteis de comportamento para novas funcionalidades e regressões; evite testar apenas detalhes de implementação.
- Atualize o README ao alterar comandos, configuração, endpoints ou escopo.
- Ao concluir uma etapa, informe o que mudou, decisões importantes, como executar/testar, resultados das verificações e próximo passo sugerido.
