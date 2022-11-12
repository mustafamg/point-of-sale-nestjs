import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { Category } from './categories/Category';
import { Product } from './Product';
import { ProductsController } from './products.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Category, Product])],
  controllers: [CategoriesController, ProductsController],
  providers: [CategoriesService]
})
export class ProductsModule {}
