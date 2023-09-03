import { Module } from '@nestjs/common';
import { BouquetService } from './bouquet.service';
import { BouquetController } from './bouquet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BouquetType } from 'src/bouquet-type/models/bouquet-type.entity';
import { Bouquet } from './models/bouquet.entity';
import { FlowerShop } from 'src/store/models/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FlowerShop, Bouquet, BouquetType])],
  controllers: [BouquetController],
  providers: [BouquetService]
})
export class BouquetModule {}
