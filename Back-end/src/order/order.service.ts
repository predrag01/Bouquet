import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './models/order.enity';
import { User } from 'src/user/models/user.entity';
import { Bouquet } from 'src/bouquet/models/bouquet.entity';
import { City } from 'src/city/models/city.entity';
import { FloverShop } from 'src/store/models/store.entity';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(Order) private orderReposistory: Repository<Order>,
        @InjectRepository(User) private userReposistory: Repository<User>,
        @InjectRepository(Bouquet) private bouquetReposistory: Repository<Bouquet>,
        @InjectRepository(City) private cityReposistory: Repository<City>,
        @InjectRepository(FloverShop) private shopReposistory: Repository<FloverShop>
    ) {}
}
