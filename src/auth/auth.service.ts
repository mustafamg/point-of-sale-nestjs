import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const validatedUser = 
        await this.validateUser(user.username, user.password);
    if(!validatedUser){
      return null;
    }
    
    const payload = { 
      username: validatedUser.username, 
      sub: validatedUser.userId, 
      roles: validatedUser.roles 
    };

    console.log("payload", payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}