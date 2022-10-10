import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { Category } from './categories/Category';

@Module({
  imports:[TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class ProductsModule {}
