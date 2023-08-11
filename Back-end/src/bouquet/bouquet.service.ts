import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BouquetType } from 'src/bouquet-type/models/bouquet-type.entity';
import { FloverShop } from 'src/store/models/store.entity';
import { Bouquet } from './models/bouquet.entity';
import { Repository } from 'typeorm';
import { BouquetDto } from './models/bouquet.dto';

@Injectable()
export class BouquetService {

    constructor(
        @InjectRepository(FloverShop) private shopReposistory: Repository<FloverShop>,
        @InjectRepository(BouquetType) private typeReposistory: Repository<BouquetType>,
        @InjectRepository(Bouquet) private bouquetReposistory: Repository<Bouquet>
    ) {}

    public async create(bouquetDto: BouquetDto) {
        const bouquet = this.bouquetReposistory.create(bouquetDto);

        const type: BouquetType | null = await this.typeReposistory.findOne({ where: {id: bouquetDto.typeId}});
        if(!type) {
            throw new BadRequestException("InvalidType");
        }
        bouquet.bouquetType= type;

        const shop: FloverShop | null = await this.shopReposistory.findOne({ where: {id: bouquetDto.storeId}});
        if(!shop) {
            throw new BadRequestException("InvalidStore");
        }
        bouquet.store= shop;

        return await this.bouquetReposistory.save(bouquet);
    };

    public async getBouquetsByShopId( shopId: number) {
        return await this.bouquetReposistory.find({ where:{ store: {id: shopId}}, relations: {bouquetType: true}})
    };
}
