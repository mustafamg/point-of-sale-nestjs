import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Category } from './categories/Category';
import { CategoriesModule } from './categories/categories.module';
import { Shift } from './shifts/Shift';
import { ShiftsModule } from './shifts/shifts.module';
import { User } from './users/user';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product';
import { AuthModule } from './auth/auth.module';

const dbConnection = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'darsh123',
  database: 'PoS',
  entities: [Category, Product, Shift, User],
  synchronize: true,
})
   
@Module({
  imports: [ 
    dbConnection,
    CategoriesModule,
    ShiftsModule,
    UsersModule,
    ProductsModule,
    AuthModule
 ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
