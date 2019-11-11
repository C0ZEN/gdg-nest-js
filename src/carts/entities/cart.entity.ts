import { Product } from 'src/products/product';

export interface Cart {
  id: number;
  products: Product[];
  creationDate?: Date;
}
