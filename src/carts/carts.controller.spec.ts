import { Test, TestingModule } from '@nestjs/testing';
import { CartsController } from './carts.controller';
import { HttpException, Logger } from '@nestjs/common';
import { Product } from 'src/products/product';
import { ProductsService } from 'src/products/products.service';

class MockProductsService {
  products: Product[] = [{ id: 1 }, { id: 2 }];

  findAll() {
    return this.products;
  }
  findOneById(id: number) {
    return this.products.find(p => p.id === id);
  }
  isStockAvailable(id: number) {
    return id === 1;
  }

  decreaseStock() {
    return true;
  }
}

describe('Carts Controller', () => {
  let controller: CartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartsController],
      providers: [{ provide: ProductsService, useClass: MockProductsService }, Logger],
    }).compile();

    controller = module.get<CartsController>(CartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return the new cart of the user', () => {
      const { creationDate, ...rest } = controller.create({ id: 1 });
      expect(rest).toEqual({ id: 1, products: [] });
    });
  });

  describe('update', () => {
    it('should throw an error if the user does not a have a cart', () => {
      try {
        controller.update({ cart: {} }, []);
      } catch (e) {
        expect(e.message).toEqual(
          'Cart not found, first create an empty cart 🛒 (PUT)',
        );
      }
    });
    it('should throw an error if the product does not exist', () => {
      try {
        controller.update({ cart: { products: [] } }, [2]);
      } catch (e) {
        expect(e.message).toEqual('Product id 2 not available 😅');
      }
    });

    it('should add products to the cart', () => {
      expect(controller.update({ cart: { products: [] } }, [1])).toEqual({
        products: [1],
      });
    });
  });

  describe('findOne', () => {
    it('should return the cart of the user', () => {
      expect(controller.findOne({ cart: { products: [{ id: 1 }] } })).toEqual({
        products: [{ id: 1 }],
      });
    });
  });

  describe('delete', () => {
    it('should return the reseted cart of the user', () => {
      expect(controller.delete({})).toEqual({});
    });
  });
});
