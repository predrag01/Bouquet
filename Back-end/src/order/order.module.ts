import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './models/order.enity';
import { User } from 'src/user/models/user.entity';
import { Bouquet } from 'src/bouquet/models/bouquet.entity';
import { City } from 'src/city/models/city.entity';
import { FloverShop } from 'src/store/models/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Order, User, Bouquet, City, FloverShop])],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
