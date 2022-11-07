import { Body, Controller, Get, Param, Patch, Post , Delete , Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoriesService } from './categories.service';
import { Category } from './Category';

@UseGuards(AuthGuard('jwt'))
@Controller('products/categories')
export class CategoriesController {
    constructor( private categoriesService: CategoriesService){}
    
    @Post()
    createCategory(@Body() item:Category){
        return this.categoriesService.createCategory(item);
    }

    @Patch(":id")
    updateCategory(@Param() param , @Body() item:Category){
        return this.categoriesService.updateCategory(param.id,item);
    }

    @Delete()
    deleteCategory(@Headers() headerObj){       
        return this.categoriesService.deleteCategory(headerObj.id);
    }
    
    // @UseGuards(AuthGuard('jwt'))
    @Get()
    getAll() {
       return this.categoriesService.getAll();
    }

    @Get(':id')
    getBayId(@Param() param):   Promise<Category> {
        return this.categoriesService.getBayId(param.id)
    }
}
