import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CityService } from './city.service';
import { CityDto } from './models/city.dto';
import { City } from './models/city.entity';

@Controller('city')
export class CityController {
    constructor( private cityService: CityService) {}

    @Get()
    public getCities() {
        return this.cityService.getAll();
    }

    @Post()
    public addCity(@Body() cityDto: CityDto) {
        return this.cityService.create(cityDto);
    }

    @Delete(":id")
    public deleteCity(@Param("id", ParseIntPipe) id : number) {
        return this.cityService.delete(id);
    }

    @Put()
    public updateCity(@Body() city: City) {
        return this.cityService.update(city);
    }
}
