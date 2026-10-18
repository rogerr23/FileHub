import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configureApp(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('FileHub API')
    .setDescription(
      'API de estudo para usuários e arquivos. Etapa 1: estrutura e saúde. Uso local ou em testes com acesso restrito.',
    )
    .setVersion('0.1.0')
    .build();

  SwaggerModule.setup('docs', app, () =>
    SwaggerModule.createDocument(app, swaggerConfig),
  );

  const config = app.get(ConfigService);
  return {
    host: config.getOrThrow<string>('HOST'),
    port: config.getOrThrow<number>('PORT'),
  };
}
