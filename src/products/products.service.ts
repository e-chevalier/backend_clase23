import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
//import { Product } from 'src/interfaces/product.interface';
import { CreateProductDto } from 'src/dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  private readonly products: Product[] = [];

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  // create(product: Product) {
  //   this.products.push(product);
  // }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // findAll(): Product[] {
  //   return this.products;
  // }

  getProductById(id): Product[] {
    return this.products.filter((p) => p.id == id);
  }

  updateProductById(obj, id): Product[] {
    return this.products.filter((p) => p.id == id);
  }

  deleteProductById(id): Product[] {
    return this.products.filter((p) => p.id == id);
  }
}
