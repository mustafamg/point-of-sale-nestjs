import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './Category';

@Injectable()
export class CategoriesService {
    constructor(
    @InjectRepository(Category)
    private CategorysRepository: Repository<Category>,
  ) {}

  getAll(): Promise<Category[]> {
    return this.CategorysRepository.find();
  }

  getById(id: number): Promise<Category> {
    return this.CategorysRepository.findOneBy({ id });
  } 
   
  async Update(id: number, item: Category) {
    return await this.CategorysRepository
            .createQueryBuilder()
            .update("category")
            .set({...item})
            .where("id = :id", { id: id })
            .execute();
  }

  async Create(body: Category){
    const existingItem = await this.CategorysRepository.findOneBy({name: body.name});
    if(existingItem)
    {
      console.warn("This category name already exists!");
      return null;
    }

    return await this.CategorysRepository.save(body);
}

  async Delete(id: number){
    const item = await this.getById(id);
    if(!item)
    {
      console.warn("The category does not exist!");
      return false;
    }
    await this.CategorysRepository.delete(id);
  }
}
