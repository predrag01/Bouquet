import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartDto } from './models/shoppingCart.dto';
import { ShoppingCart } from './models/shoppingCart.entity';

@Controller('shopping-cart')
export class ShoppingCartController {

    constructor(private cartService: ShoppingCartService) {}

    @Post()
    public addToCart(@Body() cart: ShoppingCartDto) {
        return this.cartService.addToCart(cart);
    };

    @Get(':userId')
    public getMyShoppingCart(@Param("userId", ParseIntPipe) userId: number) {
        return this.cartService.loadMyShoppingCart(userId);
    }

    @Put()
    public updateCount(@Body() cart: ShoppingCart) {
        return this.cartService.updateCount(cart);
    };

    @Delete(':cartId')
    public deleteShoppingCart(@Param("cartId", ParseIntPipe) cartId: number){
        return this.cartService.deleteCart(cartId);
    };
}
