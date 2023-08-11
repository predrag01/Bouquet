import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { FloverShop } from './models/store.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/models/user.entity';
import { City } from 'src/city/models/city.entity';
import { Bouquet } from 'src/bouquet/models/bouquet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FloverShop, City, User, Bouquet])],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
