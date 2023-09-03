import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { City } from 'src/city/models/city.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, City])],
    controllers: [UserController],
    providers: [UserService, AuthService, JwtService],
    exports: [UserService]
})
export class UserModule {}
