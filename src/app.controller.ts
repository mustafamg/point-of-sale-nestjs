import { Controller, Get, Post, UseGuards, Request, UnauthorizedException, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) { }

  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')
  async login(@Body() user): Promise<{ access_token: string; }> {
    console.log(user);
    const token = this.authService.login(user);
    if(token)
       return token;
    throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get("protected")
  protected(): string {
    return this.appService.getHello() + " protected";
  }


  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource:  'product',
    action:  'create',
    possession:  'any',
  })
  @Get("protectedWithRoles")
  protectedWithRoles(): string {
    return this.appService.getHello() + " protected with roles";
  }
  
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource:  'category',
    action:  'create',
    possession:  'any',
  })
  @Get("protectedCategory")
  protectedCategories(): string {
    return this.appService.getHello() + " protected with roles";
  }
}
