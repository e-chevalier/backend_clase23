import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true, max: 100 })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, max: 250 })
  description: string;

  @Prop({ required: true, max: 100 })
  thumbnail: string;

  @Prop({ required: true, max: 100, default: Date.now() })
  timestamp: string;

  @Prop({ required: true, max: 100 })
  code: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true, default: 0 })
  qty: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);


// id: {type: Number, require: true, unique: true},
// title: {type: String, require: true, max:100},
// price: {type: Number, require: true},
// description: {type: String, require: true, max:250},
// thumbnail: {type: String, require: true, max:100},
// timestamp: {type: String, require: true, max:100},
// code: {type: String, require: true, max:100},
// stock: {type: Number, require: true},
// qty:{type: Number, default: 0}


