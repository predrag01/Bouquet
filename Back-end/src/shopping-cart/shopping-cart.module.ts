import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from 'src/city/models/city.entity';
import { Bouquet } from 'src/bouquet/models/bouquet.entity';
import { User } from 'src/user/models/user.entity';
import { ShoppingCart } from './models/shoppingCart.entity';
import { Order } from 'src/order/models/order.enity';

@Module({
    imports: [TypeOrmModule.forFeature([ ShoppingCart, User, Bouquet, City, Order])],
    controllers: [ShoppingCartController],
    providers: [ShoppingCartService]
  })
export class ShoppingCartModule {}
