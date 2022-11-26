import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
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
    async Update(@Param() params, @Body()item:Category): Promise<boolean> {        
        let result = await this.categoriesService.Update(params.id, item);
        if(result.affected == 0){
            return false;
        }
        return true;
    }

    @Delete(":id")
    Delete(@Param() params){
        return this.categoriesService.Delete(params.id);
    }
}