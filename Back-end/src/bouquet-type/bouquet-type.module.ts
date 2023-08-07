import { Module } from '@nestjs/common';
import { BouquetTypeService } from './bouquet-type.service';
import { BouquetTypeController } from './bouquet-type.controller';
import { BouquetType } from './models/bouquet-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([BouquetType])],
    controllers: [BouquetTypeController],
    providers: [BouquetTypeService]
  })
export class BouquetTypeModule {}
