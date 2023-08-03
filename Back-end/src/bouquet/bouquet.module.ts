import { Module } from '@nestjs/common';
import { BouquetService } from './bouquet.service';
import { BouquetController } from './bouquet.controller';

@Module({
  providers: [BouquetService],
  controllers: [BouquetController]
})
export class BouquetModule {}
