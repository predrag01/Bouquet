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
        return this.orderService.updateStatus(orderId, status);
    };

    @Get()
    public getOrdersForDelivery(){
        return this.orderService.getOrderForDelivery();
    };

    @Get('/get-orders-by-delivery-guy/:deliveryGuyId')
    public getOrdersByDeliveryGuy(@Param("deliveryGuyId", ParseIntPipe) deliveryGuyId: number, @Query('status') status: string){
        return this.orderService.getOrdersFilteredByDeliveryGuy(deliveryGuyId, status as Status)
    };

    @Put('/accept-for-delivery/:orderId')
    public acceptForDelivery(@Param("orderId", ParseIntPipe) orderId: number, @Body('deliveryGuyId') deliveryGuyId: number){
        return this.orderService.acceptForDelivery(orderId, deliveryGuyId);
    };
}
