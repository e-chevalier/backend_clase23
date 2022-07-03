export class CreateProductDto {
  id: number;
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly thumbnail: string;
  readonly timestamp: string;
  readonly code: string;
  readonly stock: number;
  readonly qty: number;
}

// id: {type: Number, require: true, unique: true},
// title: {type: String, require: true, max:100},
// price: {type: Number, require: true},
// description: {type: String, require: true, max:250},
// thumbnail: {type: String, require: true, max:100},
// timestamp: {type: String, require: true, max:100},
// code: {type: String, require: true, max:100},
// stock: {type: Number, require: true},
// qty:{type: Number, default: 0}
