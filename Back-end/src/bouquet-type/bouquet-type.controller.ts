import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { BouquetTypeService } from './bouquet-type.service';
import { BouquetTypeDto } from './models/bouquet-type.dto';
import { BouquetType } from './models/bouquet-type.entity';

@Controller('bouquet-type')
export class BouquetTypeController {
    constructor( private typeService: BouquetTypeService) {}

    @Post()
    public addType(@Body() dto: BouquetTypeDto) {
        return this.typeService.create(dto);
    };

    @Get()
    public getTypes() {
        return this.typeService.getAll();
    };

    @Delete(':id')
    public deleteType(@Param("id", ParseIntPipe) id: number) {
        return this.typeService.delete(id);
    };

    @Put()
    public updateType(@Body() bouquet: BouquetType){
        return this.typeService.update(bouquet);
    };
}
