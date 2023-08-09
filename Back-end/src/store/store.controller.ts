import { Body, Controller, Post, Request } from '@nestjs/common';
import { StoreService } from './store.service';
import { FloverShopDto } from './models/store.dto';

@Controller('store')
export class StoreController {

    constructor(private storeService: StoreService) {}

    @Post()
    public create(@Body() shop: FloverShopDto) {
        return this.storeService.create(shop);
    };
}
