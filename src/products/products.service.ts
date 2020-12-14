import { Inject, Injectable } from '@nestjs/common';
import { Product } from './product.js';

@Injectable()
export class ProductsService {
  private products: Product[];

  constructor(
    @Inject('ProductsJson') private readonly productsJson: Product[],
  ) {
    this.products = productsJson;
  }

  findOneById(id: number): Product {
    return this.products.find(product => product.id === id);
  }

  findAll(): Product[] {
    return this.products;
  }

  add(product: Product) {
    this.products.push(product);
  }

  update(productToUpdate) {
    const productIndex = this.products.findIndex(
      (product: Product) => product.id === productToUpdate.id,
    );
    this.products[productIndex] = productToUpdate;
    return productToUpdate;
  }

  delete(id: number) {
    const productIndex = this.products.findIndex(
      (product: Product) => product.id === id,
    );
    this.products.splice(productIndex, 1);
  }

  isStockAvailable(id: number): Product {
    return this.products.find(
      product => product.id === id && product.stock > 0,
    );
  }

  decreaseStock(id: number): Product | boolean {
    const productIndex = this.products.findIndex(
      (product: Product) => product.id === id,
    );

    if (productIndex > -1) {
      this.products[productIndex].stock = this.products[productIndex].stock - 1;
      return this.products[productIndex];
    } else {
      return false;
    }
  }
}
