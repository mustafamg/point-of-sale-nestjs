import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ACGuard, UseRoles } from "nest-access-control";
import { Repository } from "typeorm";
import { User } from "./User";

@Controller('users')
export class UsersController{
    constructor(@InjectRepository(User)
    private usersRepository : Repository<User>){}

    @UseGuards(AuthGuard('jwt'), ACGuard)
      @UseRoles({
        resource:  'user',
        action:  'read',
        possession:  'any',
      })
    @Get()
    GetAllUsers(){
        return this.usersRepository.find({
            relations: {
                shift: true,
            },
        });
    }

    @UseGuards(AuthGuard('jwt'), ACGuard)
      @UseRoles({
        resource:  'user',
        action:  'read',
        possession:  'any',
      })
    @Get(":id")
    GetUserById(@Param() params){
        return this.usersRepository.findOneBy({id : params.id});
    }

    @UseGuards(AuthGuard('jwt'), ACGuard)
      @UseRoles({
        resource:  'user',
        action:  'create',
        possession:  'any',
      })
    @Post()
    async Create(@Body() newUser:User){
        const existingUser = await this.usersRepository.findOneBy({email: newUser.email});
        if(existingUser){
            console.warn("This user already exists!");
            return false;
        }
        await this.usersRepository.save(newUser);
    }

    @UseGuards(AuthGuard('jwt'), ACGuard)
      @UseRoles({
        resource:  'user',
        action:  'update',
        possession:  'any',
      })
    @Patch(":id")
    async Update(@Param() params, @Body() updatedUser: User){
        const oldUser = await this.usersRepository.findOneBy({id: params.id});
        if(!oldUser)
        console.warn("This user does not exist!");

        await this.usersRepository.save({id:oldUser.id, ...updatedUser});
    }

    @UseGuards(AuthGuard('jwt'), ACGuard)
      @UseRoles({
        resource:  'user',
        action:  'delete',
        possession:  'any',
      })
    @Delete(":id")
    async Delete(@Param() params){
        const existingUser = await this.usersRepository.findOneBy({id: params.id});
        if(existingUser)
        await this.usersRepository.delete(existingUser);
        
    }
    
}