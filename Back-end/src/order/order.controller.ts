import { Body, Controller, Get, Param, ParseIntPipe, Put, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Status } from 'src/enums/status.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/auth/roles.decorator';

@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':shopId')
    @Roles(Role.Admin, Role.Employee, Role.Employer)
    public getFilteredOrders(@Param("shopId", ParseIntPipe) shopId: number, @Query('filter') filter: string) {
        return this.orderService.getFilteredOrders(shopId, filter as Status);
    };

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('/update-status/:orderId')
    @Roles(Role.Admin, Role.Employee, Role.Employer, Role.DeliveryGuy)
    public updateStatus(@Param("orderId", ParseIntPipe) orderId: number, @Body('status') status: Status){
        return this.orderService.updateStatus(orderId, status);
    };

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    @Roles(Role.Admin, Role.Employee, Role.Employer, Role.DeliveryGuy)
    public getOrdersForDelivery(){
        return this.orderService.getOrderForDelivery();
    };

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/get-orders-by-delivery-guy/:deliveryGuyId')
    @Roles(Role.Admin, Role.DeliveryGuy)
    public getOrdersByDeliveryGuy(@Param("deliveryGuyId", ParseIntPipe) deliveryGuyId: number, @Query('status') status: string){
        return this.orderService.getOrdersFilteredByDeliveryGuy(deliveryGuyId, status as Status)
    };

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('/accept-for-delivery/:orderId')
    @Roles(Role.Admin, Role.DeliveryGuy)
    public acceptForDelivery(@Param("orderId", ParseIntPipe) orderId: number, @Body('deliveryGuyId') deliveryGuyId: number){
        return this.orderService.acceptForDelivery(orderId, deliveryGuyId);
    };
}
