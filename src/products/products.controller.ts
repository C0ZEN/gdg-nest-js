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

import { Product } from './product';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  @Put('')
  create(@Body() product: Product) {
    if (this.productsService.findAll().length > 5) {
      throw new HttpException(
        `Too much products added !`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    this.productsService.add(product);
    return product;
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number): Product {
    const product: Product = this.productsService.findOneById(id);
    if (product === undefined) {
      throw new HttpException(
        `Cannot find a product 🤔 with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  @Post('')
  update(@Body() productToUpdate: Product) {
    const findProduct: Product = this.productsService.findOneById(
      productToUpdate.id,
    );
    if (findProduct === undefined) {
      throw new HttpException(
        `Cannot find a product 📦 with id ${productToUpdate.id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.productsService.update(productToUpdate);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseIntPipe()) id: number) {
    const findProduct: Product = this.productsService.findOneById(id);
    if (findProduct === undefined) {
      throw new HttpException(
        `Cannot find a product 📦 with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.productsService.delete(id);
  }
}
