import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './models/user.dto';
import { SALT_ROUNDS } from 'config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>) {}

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

        return this.userRepository.save(user);
    }


    public async findOne(email: string) : Promise<User | undefined> {
        return this.userRepository.findOne({where: { email: email}, relations: {city: true, employeed: true} });
    }

    public async findUser(id: number){
        return this.userRepository.findOne({where: {id: id}, relations: {city:true} });
    }

    public async updateUser(user: User) {
        const pom = await this.findUser(user.id);

        if(!pom) {
            throw new BadRequestException('InvalidUser');
        }

        return await this.userRepository.update(user.id, user);
    }
}
