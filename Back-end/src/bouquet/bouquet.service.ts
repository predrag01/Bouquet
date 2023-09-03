import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BouquetType } from 'src/bouquet-type/models/bouquet-type.entity';
import { FlowerShop } from 'src/store/models/store.entity';
import { Bouquet } from './models/bouquet.entity';
import { Repository } from 'typeorm';
import { BouquetDto, BouquetUpdateDto } from './models/bouquet.dto';
import { UPLOAD_DESTINATION } from 'config';

@Injectable()
export class BouquetService {

    constructor(
        @InjectRepository(FlowerShop) private shopReposistory: Repository<FlowerShop>,
        @InjectRepository(BouquetType) private typeReposistory: Repository<BouquetType>,
        @InjectRepository(Bouquet) private bouquetReposistory: Repository<Bouquet>,
        @InjectRepository(BouquetType) private bouquettypeReposistory: Repository<BouquetType>
    ) {}

    public async create(bouquetDto: BouquetDto, img: Express.Multer.File) {
        const bouquet = this.bouquetReposistory.create(bouquetDto);
        
        if(img){
            const { image } = bouquet;
            const fs = require('fs');

            if (image) {
                fs.unlinkSync(`${UPLOAD_DESTINATION}/${image}`);
            }

            bouquet.image= img.filename;
        }

        const type: BouquetType | null = await this.typeReposistory.findOne({ where: {id: bouquetDto.typeId}});
        if(!type) {
            throw new BadRequestException("InvalidType");
        }
        bouquet.bouquetType= type;

        const shop: FlowerShop | null = await this.shopReposistory.findOne({ where: {id: bouquetDto.storeId}});
        if(!shop) {
            throw new BadRequestException("InvalidStore");
        }
        bouquet.store= shop;

        return await this.bouquetReposistory.save(bouquet);
    };

    public async getBouquetsByShopId( shopId: number) {
        return await this.bouquetReposistory.find({ where:{ store: {id: shopId}}, relations: {bouquetType: true}})
    };

    public async removeBouquet(id: number) {
        return await this.bouquetReposistory.delete(id);
    };

    public async updateBouquet(bouquet: BouquetUpdateDto, image: Express.Multer.File) {
        const update: Bouquet | null = await this.bouquetReposistory.findOne({ where: {id: bouquet.id}});
        if(!update) {
            throw new BadRequestException('InvalidBouquet');
        }

        const type: BouquetType= await this.bouquettypeReposistory.findOne({ where: {id: bouquet.typeId}})
        if(!type) {
            throw new BadRequestException('InvalidbouquetType');
        }
        update.bouquetType= type;

        update.title= bouquet.title;
        update.description= bouquet.description;
        update.price= bouquet.price;

        if(image){
            update.image= image.filename;
        }

        if(!(await this.bouquetReposistory.update(bouquet.id, update))){
            return { success: false };
        }

        return update;
    };

    public async getOne(id: number) {
        return await this.bouquetReposistory.findOne({ where: {id: id }, relations:{ bouquetType: true}});
    };
}
