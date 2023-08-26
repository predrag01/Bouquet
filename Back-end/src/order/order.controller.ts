import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { Status } from 'src/enums/status.enum';

@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) {}

    @Get(':shopId')
    public getFilteredOrders(@Param("shopId", ParseIntPipe) shopId: number, @Query('filter') filter: string) {
        return this.orderService.getFilteredOrders(shopId, filter as Status);
    };
}
