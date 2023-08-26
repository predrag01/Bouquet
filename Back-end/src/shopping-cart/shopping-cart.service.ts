import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCart } from './models/shoppingCart.entity';
import { User } from 'src/user/models/user.entity';
import { Bouquet } from 'src/bouquet/models/bouquet.entity';
import { City } from 'src/city/models/city.entity';
import { ShoppingCartDto } from './models/shoppingCart.dto';
import { OrderDto } from 'src/order/models/order.dto';
import { Order } from 'src/order/models/order.enity';

@Injectable()
export class ShoppingCartService {

    constructor(
        @InjectRepository(ShoppingCart) private cartReposistory: Repository<ShoppingCart>,
         @InjectRepository(User) private userReposistory: Repository<User>,
         @InjectRepository(Bouquet) private bouquetReposistory: Repository<Bouquet>,
         @InjectRepository(City) private cityReposistory: Repository<City>,
         @InjectRepository(Order) private orderReposistory: Repository<Order>
    ) {}

    public async addToCart(cartDto: ShoppingCartDto): Promise<ShoppingCart>{
        const cart = this.cartReposistory.create(cartDto);

        return await this.cartReposistory.save(cart);
    };

    public async loadMyShoppingCart(userId: number){
        return await this.cartReposistory.find({where: { buyer: {id: userId}}, relations: {bouquet:true, buyer:true, shop:true}});
    };

    public async updateCount(cart: ShoppingCart) {
        const check: ShoppingCart = await this.cartReposistory.findOne({ where: { id: cart.id }});

        if(!check) {
            throw new BadRequestException('InvalidShoppingCart');
        }

        cart.count=cart.count;

        return await this.cartReposistory.update(cart.id, cart);
    };

    public async deleteCart(cartId: number) {
        return await this.cartReposistory.delete(cartId);
    };

    public async makeOrder(orderDto: OrderDto, carts: ShoppingCart[]) {
        const order = this.orderReposistory.create(orderDto);
        
        await this.cartReposistory.remove(carts);
        
        return await this.orderReposistory.save(order);
    };
}
