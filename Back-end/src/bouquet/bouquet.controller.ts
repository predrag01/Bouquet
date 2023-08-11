import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { BouquetService } from './bouquet.service';
import { BouquetDto } from './models/bouquet.dto';
import { Bouquet } from './models/bouquet.entity';

@Controller('bouquet')
export class BouquetController {

    constructor(private bouquetService: BouquetService) {}

    @Post()
    public craete(@Body() bouquet: BouquetDto) {
        return this.bouquetService.create(bouquet);
    };

    @Get(":id")
    public getByShopId(@Param("id", ParseIntPipe) id: number) {
        return this.bouquetService.getBouquetsByShopId(id);
    };

    @Delete(":id")
    public removeBouquet(@Param("id", ParseIntPipe) id: number) {
        return this.bouquetService.removeBouquet(id);
    };

    @Put()
    public update(@Body() bouquet: Bouquet) {
        console.log(bouquet.title)
        return this.bouquetService.updateBouquet(bouquet);
    };
}
