import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { User } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) { }

  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')
  async login(@Body()user:User): Promise<{ access_token: string; }> {
    let result = this.authService.login(user);
    console.log(result);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get("protected")
  protected(): string {
    return this.appService.getHello() + " protected";
  }  
  
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource:   'product',
    action:     'read',
    possession: 'any',
  })
  @Get("protectedWithRoles")
  protectedWithRoles(): string {
    return this.appService.getHello() + " protected with roles";
  }
}
