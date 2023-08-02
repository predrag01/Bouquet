import { Body, Controller, Get, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { CityDto } from './models/city.dto';

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
}
