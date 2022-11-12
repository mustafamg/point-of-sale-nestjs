import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService:JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {   
    
    return { 
      email: payload.email,
      userId: payload.userId,
      name: payload.name,
      roles: payload.roles, 
    };
  }

  generateToken(user){
    const payload = { 
      email: user.email,
      userId: user.id,
      name: user.name,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}