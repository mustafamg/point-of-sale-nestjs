import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor (private userService: UserService, private jwtService: JwtService) {}

  async register(user: any){
    const checkUser = await this.userService.createUser(user)
    if (checkUser.message == "already exists") {
        return {message : "already exists"}
    }
    return checkUser
  }

  async checkUserInDB(email: string, pass: string): Promise<any> {
    const user = await this.userService.getByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const ckeckUser = await this.checkUserInDB(user.email, user.password);
    if (!ckeckUser) {
      throw new UnauthorizedException();
    }
    const payload = { 
      email: ckeckUser.email,
      userId: ckeckUser.id,
      name: ckeckUser.name,
      role: ckeckUser.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}