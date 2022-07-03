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

  @Delete('/:id/productos/:id_prod')
  async deleteCarritoProducto (@Param('id') id, @Param('id_prod') id_prod): Promise<Cart> {
    return this.cartsService.deleteCarritoProducto(id, id_prod);
  }

  

  @Post('/:id/productos')
  async postCarritoProducto(
    @Param('id') id,
    @Body('id_prod') id_prod,
    @Body('qty') qty,
  ): Promise<Cart> {
    return this.cartsService.postCarritoProducto(id, id_prod, qty);
  }
}
