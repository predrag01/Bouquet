import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCart } from './models/shoppingCart.entity';
import { User } from 'src/user/models/user.entity';
import { Bouquet } from 'src/bouquet/models/bouquet.entity';
import { City } from 'src/city/models/city.entity';

@Injectable()
export class ShoppingCartService {

    constructor(
        @InjectRepository(ShoppingCart) private cartReposistory: Repository<ShoppingCart>,
         @InjectRepository(User) private userReposistory: Repository<User>,
         @InjectRepository(Bouquet) private bouquetReposistory: Repository<Bouquet>,
         @InjectRepository(City) private cityReposistory: Repository<City>
    ) {}
}
