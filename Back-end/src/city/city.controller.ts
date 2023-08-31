import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CityService } from './city.service';
import { CityDto } from './models/city.dto';
import { City } from './models/city.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('city')
export class CityController {
    constructor( private cityService: CityService) {}

    @Get()
    public getCities() {
        return this.cityService.getAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @Roles(Role.Admin)
    public addCity(@Body() cityDto: CityDto) {
        return this.cityService.create(cityDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(":id")
    @Roles(Role.Admin)
    public deleteCity(@Param("id", ParseIntPipe) id : number) {
        return this.cityService.delete(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put()
    @Roles(Role.Admin)
    public updateCity(@Body() city: City) {
        return this.cityService.update(city);
    }
}
