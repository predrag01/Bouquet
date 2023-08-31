import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { BouquetTypeService } from './bouquet-type.service';
import { BouquetTypeDto } from './models/bouquet-type.dto';
import { BouquetType } from './models/bouquet-type.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('bouquet-type')
export class BouquetTypeController {
    constructor( private typeService: BouquetTypeService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @Roles(Role.Admin)
    public addType(@Body() dto: BouquetTypeDto) {
        return this.typeService.create(dto);
    };

    @Get()
    public getTypes() {
        return this.typeService.getAll();
    };

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @Roles(Role.Admin)
    public deleteType(@Param("id", ParseIntPipe) id: number) {
        return this.typeService.delete(id);
    };

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put()
    @Roles(Role.Admin)
    public updateType(@Body() bouquet: BouquetType){
        return this.typeService.update(bouquet);
    };
}
