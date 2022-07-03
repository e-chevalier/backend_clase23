import { Product } from 'src/interfaces/product.interface';

export class CreateCartDto {
  id: number;
  readonly timestamp: string;
  readonly products: Product[];
}

// id: {type: Number, require: true, unique: true},
// timestamp: {type: String, require: true, max:100},
// products: { type : Array , "default" : [] }
