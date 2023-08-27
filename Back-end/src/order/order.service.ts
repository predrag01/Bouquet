import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './models/order.enity';
import { User } from 'src/user/models/user.entity';
import { Bouquet } from 'src/bouquet/models/bouquet.entity';
import { City } from 'src/city/models/city.entity';
import { FloverShop } from 'src/store/models/store.entity';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(Order) private orderReposistory: Repository<Order>,
        @InjectRepository(User) private userReposistory: Repository<User>,
        @InjectRepository(Bouquet) private bouquetReposistory: Repository<Bouquet>,
        @InjectRepository(City) private cityReposistory: Repository<City>,
        @InjectRepository(FloverShop) private shopReposistory: Repository<FloverShop>
    ) {}

    public async getFilteredOrders(shopId: number, filter: Status){
        return await this.orderReposistory.find({where: { shop: {id: shopId }, status: filter}, relations:{bouquet: true, city: true, buyer:true, shop:true } });
    };

    public async updateStatus(orderId: number, status: Status) {
        const order: Order = await this.orderReposistory.findOne({ where: { id: orderId }});

        if(!order) {
            throw new BadRequestException('InvalidOrderId');
        }

        order.status=status;

        return await this.orderReposistory.update(orderId, order);
    };

    public async getOrderForDelivery() {
        return await this.orderReposistory.find({ where: { status: Status.ReadyToDelivery }, relations:{bouquet: true, city: true, buyer:true, shop:true }});
    };

    public async getOrdersFilteredByDeliveryGuy(deliveryGuyId: number, status: Status){
        return await this.orderReposistory.find({where: { deliveryGuy: { id: deliveryGuyId }, status: status}, relations:{bouquet: true, city: true, buyer:true, shop:true }});
    };

    public async acceptForDelivery(orderId: number, deliveryGuyId: number){
        const order: Order = await this.orderReposistory.findOne({ where: { id: orderId }});

        if(!order) {
            throw new BadRequestException('InvalidOrderId');
        }

        const user: User = await this.userReposistory.findOne({where: { id: deliveryGuyId }});

        if(!user) {
            throw new BadRequestException('InvalidDeliveryGuy');
        }

        order.deliveryGuy=user;
        order.status=Status.AcceptForDelivery;

        return await this.orderReposistory.update(orderId, order);
    };
}
