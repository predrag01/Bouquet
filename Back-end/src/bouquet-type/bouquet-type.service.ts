import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BouquetType } from './models/bouquet-type.entity';
import { Repository } from 'typeorm';
import { BouquetTypeDto } from './models/bouquet-type.dto';

@Injectable()
export class BouquetTypeService {

    constructor(@InjectRepository(BouquetType) private typeRepository: Repository<BouquetType>) {}

    public async create(typeDto: BouquetTypeDto) {
        const type = this.typeRepository.create(typeDto);
        return await this.typeRepository.save(type);
    };

    public getAll() {
        return this.typeRepository.find();
    };

    public async delete(id: number) {
        return await this.typeRepository.delete(id);
    };

    public async update(bouquet: BouquetType){
        const check: BouquetType = await this.typeRepository.findOne({ where: { id: bouquet.id}});

        if(!check) {
            throw new BadRequestException('InvalidType');
        }

        return await this.typeRepository.update(bouquet.id, bouquet);
    };

    
}
