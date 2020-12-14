import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ProductsModule } from './../../src/products/products.module';

describe('ProductsController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setViewEngine('hbs');
    await app.init();
  });

  it('/api/v1/products (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/products')
      .expect(200);
  });
});
