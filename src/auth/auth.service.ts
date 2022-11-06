import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log("validateUser ", result);
      return result;
    }
    return null;
  }

  async login(user: any) {
    const result = await this.validateUser(user.username, user.password);
     console.log(result)
    if(result == null)
      return null;
    const payload = { 
      username: result.username, 
      sub: result.userId,
      roles : result.roles
     };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}