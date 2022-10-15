import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './products/categories/categories.controller';
import { Category } from './products/categories/Category';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'darsh123',
      database: 'mysqltest',
      entities: [Category],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
