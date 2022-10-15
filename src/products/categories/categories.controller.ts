import { Controller, Get } from '@nestjs/common';
import { get } from 'http';
import { CategoriesService } from './categories.service';
import { Category } from './Category';

@Controller('products/categories')
export class CategoriesController {
    constructor(private repo:CategoriesService){ }
    @Get()
    GetAll() {
        return this.repo.getAll();
    }
    //TODO: create post
}
