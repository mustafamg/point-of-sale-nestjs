import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./User";

@Controller('users')
export class UsersController{
    constructor(@InjectRepository(User)
    private usersRepository : Repository<User>){}

    @Get()
    GetAllUsers(){
        return this.usersRepository.find({
            relations: {
                shift: true,
            },
        });
    }

    @Post()
    async Create(@Body() newUser:User){
        const existingUser = await this.usersRepository.findOneBy({email: newUser.email});
        if(existingUser){
            console.warn("This user already exists!");
            return false;
        }
        await this.usersRepository.save(newUser);
        //console.log(newUser.shifts[1]);
    }

    @Get(":id")
    GetUserById(@Param() params){
        return this.usersRepository.findOneBy({id : params.id});
    }

    @Patch(":id")
    async Update(@Param() params, @Body() updatedUser: User){
        const oldUser = await this.usersRepository.findOneBy({id: params.id});
        if(!oldUser)
        console.warn("This user does not exist!");

        await this.usersRepository.save({id:oldUser.id, ...updatedUser});
    }

    @Delete(":id")
    async Delete(@Param() params){
        const existingUser = await this.usersRepository.findOneBy({id: params.id});
        if(existingUser)
        await this.usersRepository.delete(existingUser);
        
    }
    
}