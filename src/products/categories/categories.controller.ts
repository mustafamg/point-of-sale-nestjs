import { Body, Controller, Delete, Get, Param, Patch, Post, Res, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './Category';

@Controller('products/categories')
export class CategoriesController {

    constructor(@InjectRepository(Category)
    private categorysRepository : Repository<Category>){}
    
    @Get(":id")
    GetById(@Param() params, /*@Res() res: Response*/ ){
        const result = this.categorysRepository.findOneBy({id:params.id});
        return result;
        //To return 404 not found
        /*const r = this.CategorysRepository.findOneBy({id:params.id});
        if(r == null)
        res.status(HttpStatus.NOT_FOUND).send();
        else
        return r;*/

    }

    @Get()
    GetAll(){
        return this.categorysRepository.find();
    }

    @Patch(":id")
    async Update(@Param() Params, @Body() item :Category){
        const oldItem = await this.categorysRepository.findOneBy({id : Params.id});
        if(oldItem){
            await this.categorysRepository.save({id:oldItem.id, ...item});
            return true;
        }
        else
        console.warn("The category does not exist!");
    }

    @Post()
    async Create(@Body()item:Category){
        const existingItem = await this.categorysRepository.findOneBy({name: item.name});
        if(existingItem){
            console.warn("This category name already exists!");
        }
        else
        await this.categorysRepository.save(item);
        return true;
    }

    @Delete(":id")
    async Delete(@Param() params){
        const item = await this.categorysRepository.findOneBy({id: params.id});
        if(item){
            await this.categorysRepository.delete(item);
        }
        else
        console.warn("The category does not exist!");
    }


}
