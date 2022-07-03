import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';

const DB_DOMAIN = 'cluster0.pku21.mongodb.net';
const DB_NAME = 'ecommerce';
const DB_USER = 'xyzwqt';
const DB_PASS = 'ledzeppelin';

const URL = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_DOMAIN}/${DB_NAME}?retryWrites=true&w=majority`;

@Module({
  imports: [ProductsModule, MongooseModule.forRoot(URL), CartsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
