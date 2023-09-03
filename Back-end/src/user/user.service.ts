import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { UserDto, UserUpdateDto } from './models/user.dto';
import { SALT_ROUNDS, UPLOAD_DESTINATION } from 'config';
import * as bcrypt from 'bcrypt';
import { City } from 'src/city/models/city.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(City) private cityRepository: Repository<City>) {}

    public async register(userDto: UserDto): Promise<User | undefined>{
        if(!userDto.email || !userDto.password) {
            throw new BadRequestException('MissingFields'); 
        }

        if(await this.findOne(userDto.email)) {
            throw new BadRequestException('EmailAlreadyRegistered');
        }

        const hashedPassword = await bcrypt.hash(userDto.password, SALT_ROUNDS);

        const user = new User();

        user.username=userDto.username;
        user.name=userDto.name;
        user.lastName=userDto.lastName;
        user.email=userDto.email;
        user.password=hashedPassword;
        user.phone=userDto.phone;
        user.address=userDto.address;
        user.city=userDto.city;

        return await this.userRepository.save(user);
    }


    public async findOne(email: string) : Promise<User | undefined> {
        return this.userRepository.findOne({where: { email: email}, relations: {city: true, employeed: true} });
    }

    public async findUser(id: number){
        return this.userRepository.findOne({where: {id: id}, relations: {city:true} });
    }

    public async updateUser(user: UserUpdateDto, picture: Express.Multer.File) {
        const pom: User = await this.userRepository.findOne({where: {id: user.id}, relations: {city:true, employeed: true} });
        if(!pom) {
            throw new BadRequestException('InvalidUser');
        }

        pom.username= user.username;
        pom.name= user.name;
        pom.lastName= user.lastName;
        pom.email= user.email;
        pom.phone= user.phone;
        pom.address= user.address;
        pom.role= user.role;

        const city: City = await this.cityRepository.findOne({ where: {id: user.cityId}});
        if(!city) {
            throw new BadRequestException('InvalidCity');
        }

        pom.city= city;
        pom.JMBG= user.JMBG;
        pom.vehicle= user.vehicle;

        if(picture){
            const { profilePicture } = pom;
            const fs = require('fs');

            if (profilePicture) {
                fs.unlinkSync(`${UPLOAD_DESTINATION}/${profilePicture}`);
            }

            pom.profilePicture= picture.filename;
        }

        if(!(await this.userRepository.update(user.id, pom))){
            return { success: false };
        }

        return pom;
    };

    public async deleteUser(id: number){
        return await this.userRepository.delete(id);
    };

    public async registerAsDelivery(user: User) {
        return await this.userRepository.update(user.id, user);
    }
}
