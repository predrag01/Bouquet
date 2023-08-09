import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FloverShop } from './models/store.entity';
import { Repository } from 'typeorm';
import { FloverShopDto } from './models/store.dto';
import { User } from 'src/user/models/user.entity';
import { City } from 'src/city/models/city.entity';

@Injectable()
export class StoreService {

    constructor(
        @InjectRepository(FloverShop) private shopReposistory: Repository<FloverShop>,
        @InjectRepository(City) private cityReposistory: Repository<City>,
        @InjectRepository(User) private userReposistory: Repository<User>
    ) {}

    public async create( shopDto: FloverShopDto): Promise<FloverShop> {
        const shop = this.shopReposistory.create(shopDto);

        const city: City | null = await this.cityReposistory.findOneBy({ id: shopDto.cityId });
        if(!city) {
            throw new BadRequestException('InvalidCity');
        }
        shop.city=city;

        const user: User | null = await this.userReposistory.findOneBy({ id: shopDto.ownerId });
        if(!user) {
            throw new BadRequestException('InvalidUser');
        }
        shop.owner=user;

        return await this.shopReposistory.save(shop);
    }
}
