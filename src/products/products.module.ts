import { Module } from '@nestjs/common';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class ProductsModule {}
