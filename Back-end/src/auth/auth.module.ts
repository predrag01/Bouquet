import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRATION, JWT_SECRET } from 'jwt-config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET.secret,
      signOptions: { expiresIn: JWT_EXPIRATION.time},
    }),
  ],
  providers: [AuthService, ],
  exports: [AuthService]
})
export class AuthModule {}
