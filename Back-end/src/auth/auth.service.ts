import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/models/user.entity';
import { JWT_SECRET } from 'jwt-config';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) {}
    
    async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.userService.findOne(username);
  
      if (!user) {
        return null;
      }
  
      if (!(await bcrypt.compare(pass, user.password))) {
        return null;
      }
  
      const { password, ...result } = user;
  
      return result;
    }
    
      async login(user: User) {
        const payload = { id: user.id, email: user.email, role: user.role };
        return {
          user,
          accessToken: this.jwtService.sign(payload, {
            secret: JWT_SECRET.secret,
          }),
        };
      }
}
