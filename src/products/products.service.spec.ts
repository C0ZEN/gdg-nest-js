import { Test, TestingModule } from '@nestjs/testing';
import { Product } from './product';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  it('should be defined', () => {
    const service = new ProductsService([]);
    expect(service).toBeDefined();
  });

  it('should have default empty length', () => {
    const service = new ProductsService([]);
    expect(service.findAll()).toHaveLength(0);
  });

  it('should have the correct length', () => {
    const products = [{} as Product, {} as Product];
    const service = new ProductsService(products);
    expect(service.findAll()).toHaveLength(products.length);
  });
});
