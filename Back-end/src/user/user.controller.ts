import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from './models/user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService, private authService: AuthService) {}

    @Post('register')
    public register(@Body() userDto: UserDto) {
        return this.userService.register(userDto);
    }
}
