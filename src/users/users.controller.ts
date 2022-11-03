import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { User } from './user';
import { UserService } from './users.service';


@Controller('users')
export class userController {
    constructor(private userService:UserService){} //

    @Post()
    createUser(@Body() item:User){    
        return this.userService.createUser(item)
    }

    @Get()
    getAllUsers(){
        return this.userService.getAllUsers();
    }
    
    @Get(":id")
    getUserById(@Param() param){
        return this.userService.getUserById(param.id)
    }

    @Patch(":id")
    updateUser(@Param() param , @Body() item:User){
        return this.userService.updateUser(param.id , item)
    }
}