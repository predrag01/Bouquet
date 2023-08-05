import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './models/user.dto';
import { SALT_ROUNDS } from 'jwt-config';
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
        return this.userRepository.findOneBy({ email: email});
    }

    
}
