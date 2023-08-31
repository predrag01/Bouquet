import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from './models/user.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { User } from './models/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService, private authService: AuthService) {}

    @Post('register')
    public register(@Body() userDto: UserDto) {
        return this.userService.register(userDto);
    };

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    };

    @Get(":id")
    public async getUser(@Param("id", ParseIntPipe) id: number) {
        return await this.userService.findUser(id);
    };

    @UseGuards(JwtAuthGuard)
    @Put()
    public updateUser(@Body() user: User) {
        return this.userService.updateUser(user);
    };
}
