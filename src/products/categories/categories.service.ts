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

  async delete(id: number): Promise<void> {
    await this.CategorysRepository.delete(id);
  }
}
