import { Body, Controller, Delete, Get, Param, Patch, Post, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ACGuard, UseRoles } from 'nest-access-control';
import { Repository } from 'typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './Category';

@Controller('products/categories')
export class CategoriesController {

    constructor( private categoriesService: CategoriesService){}

    @UseGuards(AuthGuard('jwt'), ACGuard)
      @UseRoles({
        resource:  'category',
        action:  'read',
        possession:  'any',
      })
    @Get(":id")
    GetById(@Param() params){
        return this.categoriesService.getById(params.id);
     
    }

    @UseGuards(AuthGuard('jwt'), ACGuard)
      @UseRoles({
        resource:  'category',
        action:  'read',
        possession:  'any',
      })
    @Get()
    GetAll(){
        return this.categoriesService.getAll();
    }

    @UseGuards(AuthGuard('jwt'), ACGuard)
      @UseRoles({
        resource:  'category',
        action:  'update',
        possession:  'any',
      })
    @Patch(":id")
    Update(@Param() params, @Body() item :Category){
        return this.categoriesService.Update(params.id, item);
    }

    @UseGuards(AuthGuard('jwt'), ACGuard)
      @UseRoles({
        resource:  'category',
        action:  'create',
        possession:  'any',
      })
    @Post()
    Create(@Body()item:Category){
        return this.categoriesService.Create(item);
    }

    @UseGuards(AuthGuard('jwt'), ACGuard)
      @UseRoles({
        resource:  'category',
        action:  'delete',
        possession:  'any',
      })
    @Delete(":id")
    Delete(@Param() params){
        return this.categoriesService.Delete(params.id);
    }


}