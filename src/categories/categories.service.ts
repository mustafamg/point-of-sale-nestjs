import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { AppModule } from 'src/app.module';
import { Repository } from 'typeorm';
import { Category } from './Category';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>){}  
    categories:Category[]

    async createCategory(item:Category){
        const {name , icon , color} = item
        const category = await this.categoryRepository.save({name , icon , color})
        return category
    }

    async updateCategory(id:number ,item:Category){
        const {name , icon , color} = item
        const getCategory = await this.categoryRepository.findOneBy({id})

        if (getCategory) {
            await this.categoryRepository.save({name , icon , color ,id:getCategory.id})
            return {message: "updated"}
        }
        else {
            return {message: "id yok"}
        }
    }

    async deleteCategory(id) {
        const getCategory = await this.categoryRepository.findOneBy({id})
        if (getCategory) {
            await this.categoryRepository.delete({id})
            return {message: "removed"}
        }
        else {
            return {message: "id yok"}
        }
    }

    async getAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }
    
    getBayId(id):  Promise<Category> {
        console.log(id);
        return this.categoryRepository.findOneBy({id})
    }
}
