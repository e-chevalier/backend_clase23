import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { Product, ProductDocument } from '../products/schemas/product.schema';

import { CreateCartDto } from 'src/dto/create-cart.dto';
import { CreateProductDto } from 'src/dto/create-product.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

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

  async postCarritoProducto(id, id_prod, qty): Promise<Cart> {
    try {
      const updateCart = await this.cartModel.findOne({ id: id }).exec();
      if (updateCart) {
        const prod = await this.productModel.findOne({ id: id_prod }).exec();
        if (prod) {
          const index = updateCart.products.findIndex(
            (prod) => prod.id == id_prod,
          );
          if (index >= 0) {
            updateCart.products[index] = Object.assign(
              updateCart.products[index],
              { qty: updateCart.products[index].qty + Number(qty) },
            );
          } else {
            let newprod = Object.assign(prod, { qty: Number(qty) });
            updateCart.products.push(newprod);
          }
          await this.cartModel
            .findOneAndUpdate({ id: id }, { products: updateCart.products })
            .exec();
        } else {
          throw new Error(`Product not found. Id ${id_prod}`);
        }
      } else {
        throw new Error(`Cart not found. Id ${id}`);
      }
      return updateCart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCarritoProducto(id, id_prod): Promise<Cart> {
    try {
      const updateCart = await this.cartModel.findOne({ id: id }).exec();
      if (updateCart) {
        const index = updateCart.products.findIndex(
          (prod) => prod.id == id_prod,
        );
        if (index >= 0) {
          updateCart.products.splice(index, 1);
          await this.cartModel
            .findOneAndUpdate({ id: id }, { products: updateCart.products })
            .exec();
        }
      } else {
        throw new Error(`Cart not found. Id ${id}`);
      }
      return updateCart;
    } catch (error) {
      throw new Error(error);
    }
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
