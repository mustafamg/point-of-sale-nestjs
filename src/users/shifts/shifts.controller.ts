import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { get } from "http";
import { ACGuard, UseRoles } from "nest-access-control";
import { CreateDateColumn, Repository } from "typeorm";
import { brotliDecompressSync } from "zlib";
import { Shift } from "./Shift";

@Controller('shifts')
export class ShiftsController{
    constructor(@InjectRepository(Shift)
    private shiftsRepository : Repository<Shift>){}

    @UseGuards(AuthGuard('jwt'), ACGuard)
      @UseRoles({
        resource:  'shift',
        action:  'read',
        possession:  'any',
      })
    @Get()
    GetAllUsers(){
        return this.shiftsRepository.find();
    }

    @UseGuards(AuthGuard('jwt'), ACGuard)
      @UseRoles({
        resource:  'shift',
        action:  'create',
        possession:  'any',
      })
    @Post()
    async Create(@Body()newShift:Shift){
        const existingShift = await this.shiftsRepository.findOneBy({id: newShift.id});
        if(existingShift){
            console.warn("This shift already exists!");
        }
        await this.shiftsRepository.save(newShift);
    }

    @UseGuards(AuthGuard('jwt'), ACGuard)
      @UseRoles({
        resource:  'shift',
        action:  'update',
        possession:  'any',
      })
    @Patch(":id")
    async Update(@Param() params, @Body() updatedShift: Shift){
        const oldProduct = await this.shiftsRepository.findOneBy({id: params.id});
        if(oldProduct)
        await this.shiftsRepository.save({id:oldProduct.id, ...updatedShift});
        
        else
        console.warn("This item does not exist!");
    }

    @UseGuards(AuthGuard('jwt'), ACGuard)
      @UseRoles({
        resource:  'shift',
        action:  'delete',
        possession:  'any',
      })
    @Delete(":id")
    async Delete(@Param() params){
        const existingshift = await this.shiftsRepository.findOneBy({id: params.id});
        if(existingshift)
        await this.shiftsRepository.delete(existingshift);
        
    }
    
}