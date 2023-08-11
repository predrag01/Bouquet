import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FloverShop } from './models/store.entity';
import { Repository } from 'typeorm';
import { FloverShopDto } from './models/store.dto';
import { User } from 'src/user/models/user.entity';
import { City } from 'src/city/models/city.entity';
import { Bouquet } from 'src/bouquet/models/bouquet.entity';

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
    };

    public async getMyStores(id: number) {
        return await this.shopReposistory.find({where: { owner: {id: id}}, relations: {city: true}});
    };

    public async deleteStore(id: number) {
        return await this.shopReposistory.delete(id);
    };

    public async updateStore(shop: FloverShop) {
        const check: FloverShop= await this.shopReposistory.findOne({where: {id: shop.id}});

        if(!check) {
            throw new BadRequestException('InvalidFloverShop');
        }

        return await this.shopReposistory.update(shop.id, shop);
    };

    public async getStore(id: number): Promise<FloverShop | undefined> {
        return await this.shopReposistory.findOne({where: { id: id}, relations: {city: true, employees:true, owner: true}});
    };

    public async addEmployee(email: string, shopId: number) {
       const user: User | null= await this.userReposistory.findOne({where: { email: email}});
       if(!user) {
            throw new BadRequestException('InvalidUser');
       }

       const shop= await this.shopReposistory.findOne({where: {id: shopId}, relations: {employees: true, city: true, owner:true}});

       if(!shop) {
        throw new BadRequestException('InvalidFloverShop');
       }

       shop.employees.push(user);

       return await this.shopReposistory.save(shop);
    };

    public async removeEmployee(userId: number, shopId: number){
       const user: User | null= await this.userReposistory.findOne({where: { id: userId}, relations: { employeed:true}});
       if(!user) {
            throw new BadRequestException('InvalidUser');
       }

       user.employeed=null;

       await this.userReposistory.save(user);

       return await this.shopReposistory.findOne({where: {id: shopId}, relations: {employees: true, city: true, bouquets: true, owner:true}});
    };

}
