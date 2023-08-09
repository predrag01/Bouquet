import { Body, Controller, Get, Param, ParseIntPipe, Post, Request } from '@nestjs/common';
import { StoreService } from './store.service';
import { FloverShopDto } from './models/store.dto';

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
    }
}
