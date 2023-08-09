import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request } from '@nestjs/common';
import { StoreService } from './store.service';
import { FloverShopDto } from './models/store.dto';
import { FloverShop } from './models/store.entity';

@Controller('store')
export class StoreController {

    constructor(private storeService: StoreService) {}

    @Post()
    public create(@Body() shop: FloverShopDto) {
        return this.storeService.create(shop);
    };

    @Get(':id')
    public getMyStores(@Param("id", ParseIntPipe) id: number) {
        return this.storeService.getMyStores(id);
    };

    @Delete(':id')
    public deleteStore(@Param("id", ParseIntPipe) id: number) {
        return this.storeService.deleteStore(id);
    };

    @Put()
    public update(@Body() shop: FloverShop) {
        return this.storeService.updateStore(shop);
    };
}
