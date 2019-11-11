import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ProductsModule } from '../../src/products/products.module';
import { ProductsService } from '../../src/products/products.service';

describe('Products', () => {
  const productsServicee = {
    findAll: () => [{ id: 1, label: 'test' }],
    findOneById: () => [{ id: 1 }],
  };

  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ProductsModule],
    })
      .overrideProvider(ProductsService)
      .useValue(productsServicee)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET products`, () => {
    return request(app.getHttpServer())
      .get('/api/v1/products')
      .expect(200)
      .expect(productsServicee.findAll());
  });

  it(`/GET product`, () => {
    return request(app.getHttpServer())
      .get('/api/v1/products/1')
      .expect(200)
      .expect(productsServicee.findOneById());
  });
  afterAll(async () => {
    await app.close();
  });
});
