import { Controller, Get, Post, UseGuards,Request, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from './auth.service';
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { JwtStrategy } from './jwt/jwt.strategy';



@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService , private readonly jwtStrategy:JwtStrategy){}

    @Post('createAdmin')
    async register(@Body() registerInfo:RegisterDto) { //: Promise<{ access_token: string; }>
      return this.authService.register(registerInfo);
    }
  
    @Post('login')
    async login(@Body() loginInfo:LoginDto): Promise<{ access_token: string; } | {message:string}> { //@Request() req:any
      return this.authService.login(loginInfo);
    }

  

  @UseGuards(AuthGuard('jwt'))
  @Get("test")
  protected(@Request() req) {
    return req.user
  }
}