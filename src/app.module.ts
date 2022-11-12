import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Category } from './products/categories/Category';
import { Product } from './products/Product';
import { ProductsModule } from './products/products.module';
import { Shift } from './users/shifts/Shift';
import { User } from './users/User';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ProductsModule, UsersModule, AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'PoS',
      entities: [Category, Product, User, Shift],
      synchronize: true,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
