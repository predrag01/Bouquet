import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { StoreService } from './store.service';
import { FlowerShopDto, FlowerShopUpdateDto } from './models/store.dto';
import { FlowerShop } from './models/store.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { FILE_CONF } from 'config';


@Controller('store')
export class StoreController {

    constructor(private storeService: StoreService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('picture', FILE_CONF))
    public create(@Body() shop: FlowerShopDto, @UploadedFile() picture: Express.Multer.File) {
        return this.storeService.create(shop, picture);
    };

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    @Roles(Role.Admin, Role.Employer)
    public getMyStores(@Param("id", ParseIntPipe) id: number) {
        return this.storeService.getMyStores(id);
    };

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @Roles(Role.Admin, Role.Employer)
    public deleteStore(@Param("id", ParseIntPipe) id: number) {
        return this.storeService.deleteStore(id);
    };

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put()
    @Roles(Role.Admin, Role.Employer)
    @UseInterceptors(FileInterceptor('picture', FILE_CONF))
    public update(@Body() shop: FlowerShopUpdateDto, @UploadedFile() picture: Express.Multer.File) {
        console.log(shop.id);
        return this.storeService.updateStore(shop, picture);
    };

    @Get('/getStore/:id')
    public getOneShop(@Param("id", ParseIntPipe) id: number) {
        return this.storeService.getStore(id);
    };

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('/addEmployee/:id')
    @Roles(Role.Admin, Role.Employer)
    public addEmployee(@Param("id", ParseIntPipe) id: number, @Body("email") email: string) {
        return this.storeService.addEmployee(email, id);
    };

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('/removeEmployee/:id')
    @Roles(Role.Admin, Role.Employer)
    public removeEmployee(@Param("id", ParseIntPipe) id: number, @Body("userId") userId: number) {
        return this.storeService.removeEmployee(userId, id);
    };

    @Get('/home/:cityId')
    public getStoresForHome(@Param("cityId", ParseIntPipe) cityId: number){
        return this.storeService.loadStoresForHome(cityId);
    };

    @Get()
    public getAll(){
        return this.storeService.getAll();
    };

    @Get('/employee-store/:id')
    public getStoreByEmployee(@Param("id", ParseIntPipe) id: number){
        return this.storeService.getFlowerStoreByEmployee(id);
    };
}
