import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import productsJson from './../../static/data/products.json';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    { provide: 'ProductsJson', useValue: productsJson },
  ],
})
export class ProductsModule {}
