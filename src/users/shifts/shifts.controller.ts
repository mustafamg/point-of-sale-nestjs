import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { get } from "http";
import { CreateDateColumn, Repository } from "typeorm";
import { brotliDecompressSync } from "zlib";
import { Shift } from "./Shift";

@Controller('shifts')
export class ShiftsController{
    constructor(@InjectRepository(Shift)
    private shiftsRepository : Repository<Shift>){}

    @Get()
    GetAllUsers(){
        return this.shiftsRepository.find();
    }

    @Post()
    async Create(@Body()newUser:Shift){
        /*const existingUser = await this.shiftsRepository.findOneBy({id: newUser.id});
        if(existingUser){
            console.warn("This user already exists!");
        }
        else*/
        await this.shiftsRepository.save(newUser);
        return true;
    }
    @Patch(":id")
    async Update(@Param() params, @Body() updatedShift: Shift){
        const oldProduct = await this.shiftsRepository.findOneBy({id: params.id});
        if(oldProduct)
        await this.shiftsRepository.save({id:oldProduct.id, ...updatedShift});
        
        else
        console.warn("This item does not exist!");
    }

    @Delete(":id")
    async Delete(@Param() params){
        const existingshift = await this.shiftsRepository.findOneBy({id: params.id});
        if(existingshift)
        await this.shiftsRepository.delete(existingshift);
        
    }
    
}