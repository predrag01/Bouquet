import { Body, Controller, Post } from '@nestjs/common';
import { BouquetService } from './bouquet.service';
import { BouquetDto } from './models/bouquet.dto';

@Controller('bouquet')
export class BouquetController {

    constructor(private bouquetService: BouquetService) {}

    @Post()
    public craete(@Body() bouquet: BouquetDto) {
        return this.bouquetService.create(bouquet);
    };
}
