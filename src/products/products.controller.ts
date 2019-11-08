import {
  Controller,
  Get,
  Put,
  Body,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  HttpCode,
} from '@nestjs/common';

import productsJson from './../../static/data/products.json';
import { Product } from './product';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('products')
@Controller('api/v1/products')
export class ProductsController {
  products: Product[] = productsJson;

  @Get('')
  findAll(): any[] {
    return this.products;
  }

  @Put('')
  create(@Body() product: any) {
    if (this.products.length > 5) {
      throw new HttpException(
        `Too much products added !`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    this.products.push(product);
    return product;
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number): Product {
    const product: Product = this.products.find(pro => pro.id === id);
    if (product === undefined) {
      throw new HttpException(
        `Cannot find a product 🤔 with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  @Post('')
  update(@Body() productToUpdate: any) {
    const productIndex = this.products.findIndex(
      (product: Product) => product.id === productToUpdate.id,
    );
    if (productIndex === -1) {
      throw new HttpException(
        `Cannot find a product with id ${productToUpdate.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.products[productIndex] = productToUpdate;
    return productToUpdate;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseIntPipe()) id: number) {
    const productIndex = this.products.findIndex(
      (product: Product) => product.id === id,
    );
    if (productIndex < 0) {
      throw new HttpException(
        `Cannot find a product 🤔 with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.products.splice(productIndex, 1);
  }
}
