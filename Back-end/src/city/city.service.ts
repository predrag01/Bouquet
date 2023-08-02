import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './models/city.entity';
import { CityDto } from './models/city.dto';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(City) private cityRepository: Repository<City>
    ) {}

    public getAll() {
        return this.cityRepository.find();
    }

    public async create(cityDto: CityDto) {
        const city = this.cityRepository.create(cityDto);
        return await this.cityRepository.save(city);
    }
}
