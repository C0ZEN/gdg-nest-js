import { Module, Logger } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [CartsController],
  imports: [ProductsModule],
  providers: [{ provide: Logger, useFactory: () => new Logger('CartsModule') }],
})
export class CartsModule {}
