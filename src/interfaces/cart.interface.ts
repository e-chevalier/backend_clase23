import { Product } from 'src/interfaces/product.interface';

export interface Cart {
  readonly id: number;
  readonly timestamp: string;
  readonly products: Product[];
}
