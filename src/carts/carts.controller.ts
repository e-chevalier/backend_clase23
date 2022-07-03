import {
  Param,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Cart } from 'src/interfaces/cart.interface';
import { CartsService } from './carts.service';
import { CreateCartDto } from 'src/dto/create-cart.dto';

@Controller('api/carritos')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
    this.cartsService.create(createCartDto);
  }

  @Get()
  async findAll(): Promise<Cart[]> {
    return this.cartsService.findAll();
  }

  @Get('/:id/productos')
  async getCartById(@Param('id') id): Promise<Cart> {
    return this.cartsService.getCartById(id);
  }

  @Delete('/:id')
  async deleteCartById(@Param('id') id): Promise<Cart> {
    return this.cartsService.deleteCartById(id);
  }
}
