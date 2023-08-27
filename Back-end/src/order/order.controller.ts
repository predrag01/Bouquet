import { Body, Controller, Get, Param, ParseIntPipe, Put, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { Status } from 'src/enums/status.enum';

@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) {}

    @Get(':shopId')
    public getFilteredOrders(@Param("shopId", ParseIntPipe) shopId: number, @Query('filter') filter: string) {
        return this.orderService.getFilteredOrders(shopId, filter as Status);
    };

    @Put('/update-status/:orderId')
    public updateStatus(@Param("orderId", ParseIntPipe) orderId: number, @Body('status') status: Status){
        console.log(status);
        return this.orderService.updateStatus(orderId, status);
    };
}
