import { Body, Controller, Delete, Get, Param, Patch, Post, Res, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './Category';

@Controller('products/categories')
export class CategoriesController {

    constructor( private categoriesService: CategoriesService){}

    @Get(":id")
    GetById(@Param() params){
        return this.categoriesService.getById(params.id);
     
    }

    @Get()
    GetAll(){
        return this.categoriesService.getAll();
    }

    @Patch(":id")
    Update(@Param() params, @Body() item :Category){
        return this.categoriesService.Update(params.id, item);
    }

    @Post()
    Create(@Body()item:Category){
        return this.categoriesService.Create(item);
    }

    @Delete(":id")
    Delete(@Param() params){
        return this.categoriesService.Delete(params.id);
    }


}