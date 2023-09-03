import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlowerShop } from './models/store.entity';
import { Repository } from 'typeorm';
import { FlowerShopDto, FlowerShopUpdateDto } from './models/store.dto';
import { User } from 'src/user/models/user.entity';
import { City } from 'src/city/models/city.entity';
import { Bouquet } from 'src/bouquet/models/bouquet.entity';
import { UPLOAD_DESTINATION } from 'config';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class StoreService {

    constructor(
        @InjectRepository(FlowerShop) private shopReposistory: Repository<FlowerShop>,
        @InjectRepository(City) private cityReposistory: Repository<City>,
        @InjectRepository(User) private userReposistory: Repository<User>
    ) {}

    public async create( shopDto: FlowerShopDto, picture: Express.Multer.File): Promise<FlowerShop> {
        const shop = this.shopReposistory.create(shopDto);

        if(picture){
            shop.picture= picture.filename;
        }

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

        if(user.role !== Role.Employer){
            user.role= Role.Employer;
            await this.userReposistory.update(user.id, user);
        }

        return await this.shopReposistory.save(shop);
    };

    public async getMyStores(id: number) {
        let stores: FlowerShop[]= await this.shopReposistory.find({where: { owner: {id: id}}, relations: {city: true, owner: true}});
        return stores;
    };

    public async deleteStore(id: number) {
        return await this.shopReposistory.delete(id);
    };

    public async updateStore(shop: FlowerShopUpdateDto, img: Express.Multer.File) {
        const updatedShop: FlowerShop= await this.shopReposistory.findOne({where: {id: shop.id}});
        if(!updatedShop) {
            throw new BadRequestException('InvalidFloverShop');
        }

        const city: City= await this.cityReposistory.findOne({where: {id: shop.cityId}});
        if(!city) {
            throw new BadRequestException('InvalidCity');
        }
        updatedShop.city= city;

        if(img){
            const { picture } = updatedShop;
            const fs = require('fs');

            if (picture) {
                fs.unlinkSync(`${UPLOAD_DESTINATION}/${picture}`);
            }

            updatedShop.picture= img.filename;
        }

        updatedShop.name= shop.name;
        updatedShop.address= shop.address;
        updatedShop.email= shop.email;
        updatedShop.phone= shop.phone;
        updatedShop.pib= shop.pib;
        updatedShop.monFri= shop.monFri;
        updatedShop.saturday= shop.saturday;
        updatedShop.sunday= shop.sunday;

        if(!(await this.shopReposistory.update(shop.id, updatedShop))){
            return { success: false };
        }

        return updatedShop;
    };

    public async getStore(id: number): Promise<FlowerShop | undefined> {
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

       if(user.role === Role.User){
           user.role= Role.Employee;
           await this.userReposistory.update(user.id, user);
           
           shop.employees.push(user);
        }


       return await this.shopReposistory.save(shop);
    };

    public async removeEmployee(userId: number, shopId: number){
       const user: User | null= await this.userReposistory.findOne({where: { id: userId}, relations: { employeed:true}});
       if(!user) {
            throw new BadRequestException('InvalidUser');
       }

       user.employeed=null;
       user.role= Role.User;

       await this.userReposistory.save(user);

       return await this.shopReposistory.findOne({where: {id: shopId}, relations: {employees: true, city: true, bouquets: true, owner:true}});
    };

    public async loadStoresForHome(cityId: number){
        return await this.shopReposistory.find({where: { city: { id: cityId }}, relations: { city: true}});
    };

    public async getAll(){
        return await this.shopReposistory.find();
    };

    public async getFlowerStoreByEmployee(id: number){
        const user: User= await this.userReposistory.findOne({where: {id: id}, relations: {employeed: true}});
        if(!user) {
            throw new BadRequestException('InvalidUser');
       }

       return await this.shopReposistory.findOne({where: {id: user.employeed.id}, relations: {employees: true, city: true, bouquets: true, owner:true}});
    }
}
