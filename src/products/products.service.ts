import { Injectable } from '@nestjs/common';
import { Product } from 'src/interfaces/product.interface';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [];

  create(product: Product) {
    this.products.push(product);
  }

  findAll(): Product[] {
    return this.products;
  }

  getProductById(id): Product[] {
    return this.products.filter(p => p.id == id);
  }

  updateProductById(obj, id): Product[] {
    return this.products.filter(p => p.id == id);
  }

  deleteProductById(id): Product[] {
    return this.products.filter(p => p.id == id);
  }
}
