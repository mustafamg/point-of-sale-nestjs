import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { getDataSourceName, InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { get } from 'http';
import { Repository } from 'typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './Category';

@Controller('products/categories')
export class CategoriesController {

    constructor(
        @InjectRepository(Category)
        private categorysRepository: Repository<Category>){ }
    
    @Get(":id")
    GetById(@Param() params) {
        const result = this.categorysRepository.findOneBy({id:params.id});
        return result;
    }

    @Get()
    GetAll() {
        return this.categorysRepository.find();
    }
    
    @Post()
    Create(@Body()item:Category):boolean{
        this.categorysRepository.save(item);
        console.log(item);
        return true;        
    }

    @Patch(":id")
    async Update(@Param() params, @Body()item:Category) {
        
        let result = await this.categorysRepository
            .createQueryBuilder()
            .update("category")
            .set({id: params.id,...item})
            .where("id = :id", { id: params.id })
            .execute();
        if(result.affected == 0){
            console.warn("there is no such category ID");
        }
        return true;
    }

    @Delete(":id")
    Delete(@Param() params){
        this.categorysRepository.delete({id:params.id});
        return true;
    }
}
