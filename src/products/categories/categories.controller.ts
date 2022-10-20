import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
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
        private CategorysRepository: Repository<Category>){ }
    
    @Get(":id")
    GetById(@Param() params) {
        const result = this.CategorysRepository.findOneBy({id:params.id});
        return result;
    }

    @Get()
    GetAll() {
        return this.CategorysRepository.find();
    }
    
    @Post()
    Create(@Body()item:Category):boolean{
        //this.categories.push(item);
        console.log(item);
        return true;        
    }
}
