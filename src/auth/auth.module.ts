import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessControlModule } from 'nest-access-control';
import { UsersModule } from 'src/users/users.module';
import { Roles } from './auth.roles';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
    AccessControlModule.forRoles(Roles)
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
