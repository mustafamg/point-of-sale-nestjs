import { Body, Controller, Get, Param, Patch, Post , Delete , Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { CategoriesService } from './categories.service';
import { Category } from './Category';


@UseGuards(AuthGuard('jwt'), ACGuard)
@Controller('products/categories')
export class CategoriesController {
    constructor( private categoriesService: CategoriesService){}
    
    @UseRoles({
        resource:  'category',
        action:  'read',
        possession:  'any',
    })
    @Get()
    getAll() {
       return this.categoriesService.getAll();
    }

    @UseRoles({
      resource:  'category',
      action:  'read',
      possession:  'any',
    })
    @Get()
    @Get(':id')
    getBayId(@Param() param):   Promise<Category> {
        return this.categoriesService.getBayId(param.id)
    }

    @UseRoles({
      resource:  'category',
      action:  'create',
      possession:  'any',
    })
    @Post()
    createCategory(@Body() item:Category){
        return this.categoriesService.createCategory(item);
    }

    @UseRoles({
      resource:  'category',
      action:  'create',
      possession:  'any',
    })
    @Patch(":id")
    updateCategory(@Param() param , @Body() item:Category){
        return this.categoriesService.updateCategory(param.id,item);
    }

    @UseRoles({
      resource:  'category',
      action:  'create',
      possession:  'any',
    })
    @Delete()
    deleteCategory(@Headers() headerObj){       
        return this.categoriesService.deleteCategory(headerObj.id);
    }
    


}
