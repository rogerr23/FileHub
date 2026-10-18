import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/setup';

describe('FileHub API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app?.close();
  });

  it('GET /health returns HTTP 200 and the health status', async () => {
    await request(app.getHttpServer())
      .get('/health')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({ status: 'ok' });
  });

  it('publishes the health endpoint and response schema in OpenAPI', async () => {
    const response = await request(app.getHttpServer())
      .get('/docs-json')
      .expect(200);
    expect(response.body.paths['/health'].get.responses['200']).toMatchObject({
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/HealthResponseDto' },
        },
      },
    });
    expect(response.body.components.schemas.HealthResponseDto).toMatchObject({
      properties: { status: { enum: ['ok'] } },
      required: ['status'],
    });
  });

  it('serves the Swagger UI', async () => {
    await request(app.getHttpServer())
      .get('/docs/')
      .expect(200)
      .expect('Content-Type', /html/);
  });

  it.each(['/users', '/files'])(
    'keeps %s unimplemented in this stage',
    async (path) => {
      await request(app.getHttpServer()).get(path).expect(404);
    },
  );
});
