import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req): Promise<{ access_token: string; }> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("protected")
  protected(): string {
    return this.appService.getHello() + " protected";
  }
}
