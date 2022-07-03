import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

import { CreateProductDto } from 'src/dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const maxid = await this.getMaxid();
    createProductDto.id = maxid + 1;

    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async getProductById(id): Promise<Product> {
    return this.productModel.findOne({ id: id }).exec();
  }

  async updateProductById(obj, id): Promise<Product> {
    const updatedProduct = await this.productModel.findOneAndUpdate({ id: id }, obj).exec();
    return updatedProduct;
  }

  async deleteProductById(id): Promise<Product> {
    const deletedProduct = await this.productModel.findOneAndDelete({'id': id}).exec();

    return deletedProduct;
  }

  async getMaxid() {
    try {
      const tmp = await this.productModel
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
