import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCategoryCommand } from './Cammands/create-category.command';
import { CategoriesService } from './categories.service';
import { Category } from './Category';

@Controller('products/categories')
export class CategoriesController {
    constructor(private commandBus: CommandBus, private categoriesService: CategoriesService){}

    @Get(":id")
    GetById(@Param() params){
        return this.categoriesService.getById(params.id);
    }

    @Get()
    GetAll(){
        return this.categoriesService.getAll();
    }
 
    @Post()
    async Create(@Body()item:Category) { 
        this.commandBus.execute(
            new CreateCategoryCommand(item.name, item.icon, item.color)
          );
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