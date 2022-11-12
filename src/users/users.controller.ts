import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ACGuard, UseRoles } from "nest-access-control";
import { UserUpdate } from "./dto/user-update.dto";
// import { Role } from "../authorization/RBAC/role.enum";
// import { Roles } from "../authorization/RBAC/roles.decorator";
// import { RolesGuard } from "../authorization/RBAC/roles.guard";
import { User } from './user';
import { UserService } from './users.service';


@Controller('users')
export class userController {
    constructor(private userService:UserService){} 

    @Post()
    createUser(@Body() item:User){    
        return this.userService.createUser(item)
    }

    @UseGuards(AuthGuard('jwt'), ACGuard)
    @UseRoles({
      resource:  'product',
      action:  'read',
      possession:  'any',
    })
    @Get('test')
    testNow(){
        return "success"
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(":id")
    getUserById(@Param() param){
        return this.userService.getUserById(param.id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(":id")
    updateUser(@Param() param , @Body() item:UserUpdate){
        return this.userService.updateUser(param.id , item)
    }


  
    /* // ---- Test Authurization with RBAC

     @UseGuards(AuthGuard('jwt'), RolesGuard)
     @Roles(Role.Admin)
     @Get()
     testAuthurizeByRBAC(){
         return {message:'success'};
     } */

}