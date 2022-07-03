import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/interfaces/product.interface';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true, max: 100, default: Date.now() })
  timestamp: string;

  @Prop({ default: [] })
  products: Product[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
