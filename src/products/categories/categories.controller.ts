import { Controller, Get } from '@nestjs/common';
import { get } from 'http';
import { Category } from './Category';

@Controller('products/categories')
export class CategoriesController {
    @Get()
    GetAll() {
        return [{
            id: 1,
            color: "red",
            icon: "home",
            name: "some name"
        } as Category
        ];
    }
}
