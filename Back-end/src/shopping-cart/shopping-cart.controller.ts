import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartDto } from './models/shoppingCart.dto';
import { ShoppingCart } from './models/shoppingCart.entity';
import { OrderDto } from 'src/order/models/order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('shopping-cart')
export class ShoppingCartController {

    constructor(private cartService: ShoppingCartService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    public addToCart(@Body() cart: ShoppingCartDto) {
        return this.cartService.addToCart(cart);
    };

    @UseGuards(JwtAuthGuard)
    @Get(':userId')
    public getMyShoppingCart(@Param("userId", ParseIntPipe) userId: number) {
        return this.cartService.loadMyShoppingCart(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    public updateCount(@Body() cart: ShoppingCart) {
        return this.cartService.updateCount(cart);
    };

    @UseGuards(JwtAuthGuard)
    @Delete(':cartId')
    public deleteShoppingCart(@Param("cartId", ParseIntPipe) cartId: number){
        return this.cartService.deleteCart(cartId);
    };

    @UseGuards(JwtAuthGuard)
    @Post('/make-order')
    public order(@Body() param: { orders: OrderDto[], carts: ShoppingCart[] }) {
        return this.cartService.makeOrder(param.orders, param.carts);
    };
}
