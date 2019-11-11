import { Query, Resolver, Args } from '@nestjs/graphql';
import { Int } from 'type-graphql';
import { Product } from './product';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productsService.findAll();
  }

  @Query(() => Product)
  product(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.productsService.findOneById(id);
  }
}
