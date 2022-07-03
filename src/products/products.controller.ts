import {
  Param,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Product } from 'src/interfaces/product.interface';
import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/dto/create-product.dto';

@Controller('api/productos')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get('/:id')
  async getProductById(@Param('id') id): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @Put('/:id')
  async updateProductById(@Body() obj, @Param('id') id): Promise<Product> {
    return this.productsService.updateProductById(obj, id);
  }

  @Delete('/:id')
  async deleteProductById(@Param('id') id): Promise<Product> {
    return this.productsService.deleteProductById(id);
  }
}
