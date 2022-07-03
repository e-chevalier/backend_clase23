import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';

import { CreateCartDto } from 'src/dto/create-cart.dto';

@Injectable()
export class CartsService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const maxid = await this.getMaxid();
    createCartDto.id = maxid + 1;

    const createdCart = new this.cartModel(createCartDto);
    return createdCart.save();
  }

  async findAll(): Promise<Cart[]> {
    return this.cartModel.find().exec();
  }

  async getCartById(id): Promise<Cart> {
    return this.cartModel.findOne({ id: id }).exec();
  }

  async deleteCartById(id): Promise<Cart> {
    const deletedCart = await this.cartModel
      .findOneAndDelete({ id: id })
      .exec();

    return deletedCart;
  }

  async getMaxid() {
    try {
      const tmp = await this.cartModel
        .find({}, { id: 1, _id: 0 })
        .sort({ id: -1 })
        .limit(1);
      const res = tmp.length ? tmp[0].id : 0;
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
}
