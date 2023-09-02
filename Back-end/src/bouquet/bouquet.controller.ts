import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BouquetService } from './bouquet.service';
import { BouquetDto, BouquetUpdateDto } from './models/bouquet.dto';
import { Bouquet } from './models/bouquet.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { FILE_CONF } from 'config';

@Controller('bouquet')
export class BouquetController {

    constructor(private bouquetService: BouquetService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @Roles(Role.Admin, Role.Employee, Role.Employer)
    @UseInterceptors(FileInterceptor('image', FILE_CONF))
    public craete(@Body() bouquet: BouquetDto, @UploadedFile() image: Express.Multer.File) {
        return this.bouquetService.create(bouquet, image);
    };

    @Get(":id")
    public getByShopId(@Param("id", ParseIntPipe) id: number) {
        return this.bouquetService.getBouquetsByShopId(id);
    };

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(":id")
    @Roles(Role.Admin, Role.Employee, Role.Employer)
    public removeBouquet(@Param("id", ParseIntPipe) id: number) {
        return this.bouquetService.removeBouquet(id);
    };

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put()
    @Roles(Role.Admin, Role.Employee, Role.Employer)
    @UseInterceptors(FileInterceptor('image', FILE_CONF))
    public update(@Body() bouquet: BouquetUpdateDto, @UploadedFile() image: Express.Multer.File) {
        return this.bouquetService.updateBouquet(bouquet, image);
    };

    @Get("/getOne/:id")
    public getOne(@Param("id", ParseIntPipe) id: number) {
        return this.bouquetService.getOne(id);
    };
}
