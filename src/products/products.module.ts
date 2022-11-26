import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryCreatedEvent, CategoryCreatedEventHandler } from './categories/Cammands/category-created.event';
import { CreateCategoryCommandHandler } from './categories/Cammands/create-category.command';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { Category } from './categories/Category';
import { Product } from './Product';
import { ProductsController } from './products.controller';

const commandHandlers = [CreateCategoryCommandHandler];
const eventHandlers = [CategoryCreatedEventHandler];
@Module({
  imports:[
    CqrsModule, 
    TypeOrmModule.forFeature([Category, Product])
  ],
  controllers: [CategoriesController, ProductsController],
  providers: [
    CategoriesService,
    ...commandHandlers,
    ...eventHandlers
  ]
})
export class ProductsModule {}
